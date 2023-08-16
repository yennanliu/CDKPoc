#!/usr/bin/env node

import {App} from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
//import { VpcPeeringStack } from '../lib/vpc-peering-stack';
import { Construct } from 'constructs';
// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2-readme.html
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// https://youtu.be/puUpjHWW44c?t=392

export interface VpcPeeringProps{
    // ? : means if not existed, create a new one
    readonly vpc?: ec2.IVpc
}

export class VpcPeering extends Construct{

    readonly vpc?: ec2.IVpc
    readonly peerVpc?: ec2.IVpc

    constructor(scope: Construct, id: string, props: VpcPeeringProps={}){
        super(scope, id)

        this.vpc = props.vpc ?? this._createVpc('10.0.0.0/16')
        this.peerVpc = this._createVpc('10.1.0.0/16')

        // VPC peering
        const Connection = new ec2.CfnVPCPeeringConnection(this, 'vpc-peering-conn', {
            vpcId: this.vpc.vpcId,
            peerVpcId:this.peerVpc.vpcId,
        })

        // 1st Route
        // existing VPC (private subnet) --> VPC peering --> new VPC
        new ec2.CfnRoute(this, 'exist-2-new-route', {
            routeTableId: this.vpc.privateSubnets[0].routeTable.routeTableId,
            destinationCidrBlock: this.peerVpc.vpcCidrBlock,
            vpcPeeringConnectionId: Connection.ref
        })

        // 2nd Route
        //  new VPC --> VPC peering --> existing VPC (private subnet)
        new ec2.CfnRoute(this, 'new-2-exist-route', {
            routeTableId: this.peerVpc.privateSubnets[0].routeTable.routeTableId,
            destinationCidrBlock: this.vpc.vpcCidrBlock,
            vpcPeeringConnectionId: Connection.ref
        })

    }

    private _createVpc(cidr: string): ec2.IVpc {
        return new ec2.Vpc(this, 'dummy-vpc', {natGateways: 1, cidr: cidr})
    }

}

/**
 * 
 *  Main contruct
 *
 */
export class EksPeeringDemo extends Construct{
    constructor(scope: Construct, id: string){
        super(scope, id)

        const existingVpc = ec2.Vpc.fromLookup(this, 'existing-vpc', {
            vpcId: this.node.tryGetContext('use_vpc_id')
        })
        new VpcPeering(this, 'vpc-peering', {vpc: existingVpc})
    }
}

const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
}

/**
 * 
 *  Entty point
 *
 */
const app = new App();

//const stack = new Stack(app, 'my-stack-dev', {env: devEnv})
const stack = new Stack(app, 'my-stack-dev')

new EksPeeringDemo(stack, 'demo')

app.synth()
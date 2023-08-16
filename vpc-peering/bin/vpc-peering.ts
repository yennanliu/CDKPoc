#!/usr/bin/env node
import {App} from 'aws-cdk-lib';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
//import {  } from 'aws-cdk-ec2';
// import {App} from 'aws-cdk-core';
import { VpcPeeringStack } from '../lib/vpc-peering-stack';
import { Construct } from 'constructs';
// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2-readme.html
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { privateDecrypt } from 'crypto';

// https://youtu.be/puUpjHWW44c?t=392

export interface VpcPeeringProps{
    // ? : means if not existed, create a new one
    readonly vpc?: ec2.IVpc
}


export class VpcPeering extends Construct{
    constructor(scope: Construct, id: string, props: VpcPeeringProps={}){
        super(scope, id)

        new ec2.CfnVPCPeeringConnection(this, 'vpc-peering-conn', {
            vpcId: props.vpc ? props.vpc.vpcId : this._createVpc().vpcId,
            peerVpcId:
        })

    }

    private _createVpc(): ec2.IVpc {
        return new ec2.Vpc(this, 'dummy-vpc', {natGateways: 1})
    }
}


export class EksPeeringDemo extends Construct{
    constructor(scope: Construct, id: string){
        super(scope, id)
    }
}

const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
}

const app = new App();

const stack = new Stack(app, 'my-stack-dev', {env: devEnv})

new EksPeeringDemo(stack, 'demo')


app.synth()
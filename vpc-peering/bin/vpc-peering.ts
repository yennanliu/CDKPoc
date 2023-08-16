#!/usr/bin/env node
import {App} from 'aws-cdk-lib';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
// import {App} from 'aws-cdk-core';
import { VpcPeeringStack } from '../lib/vpc-peering-stack';
import { Construct } from 'constructs';

// https://youtu.be/puUpjHWW44c?t=392

// export class MyStack extends Stack{
//     constructor(scope: Construct, id: string, props: StackProps = {}){
//         super(scope, id, props)
//     }
// }

export class VpcPeeringDemo extends Construct{
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

new VpcPeeringDemo(stack, 'demo')


app.synth()
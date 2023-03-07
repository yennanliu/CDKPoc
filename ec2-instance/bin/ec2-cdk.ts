#!/usr/bin/env node

// https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ec2-instance/bin/ec2-cdk.ts

// import 'source-map-support/register';
// import * as cdk from 'aws-cdk-lib';
// import { Ec2InstanceStack } from '../lib/ec2-instance-stack';

import * as cdk from 'aws-cdk-lib';
import { Ec2CdkStack } from '../lib/ec2-cdk-stack';

const app = new cdk.App();

new Ec2CdkStack(app, 'Ec2CdkStack', {});
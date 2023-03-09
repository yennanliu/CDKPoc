//import * as cdk from 'aws-cdk-lib';
//import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

// https://catalog.us-east-1.prod.workshops.aws/workshops/5962a836-b214-4fbf-9462-fedba7edcc9b/en-US/the-workshop/2-create-vpc

export class CustomVpc1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const vpc = new ec2.Vpc(this, "my_Vpc1", {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'my_vpc_subnet',
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ]
    });

    // const vpc = new ec2.Vpc(this, "VPC", {
    //   natGateways: 1,
    // });

  }
  
}

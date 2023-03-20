import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as core from 'aws-cdk-lib/core';
import * as path from 'path';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';

const app = new cdk.App();

const stackNames = ['FlaskCluster1', 'FlaskCluster2', 'FlaskCluster3'];

stackNames.forEach((stackName, index) => {
  const stack = new core.Stack(app, stackName, {
    stackName,
  });

  const vpc = new ec2.Vpc(stack, `FlaskVPC${index}`, {});

  const instance = new ec2.Instance(stack, `FlaskInstance${index}`, {
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
    machineImage: ec2.MachineImage.latestAmazonLinux(),
    vpc,
    keyName: 'your-key-name'
  });

  const cluster = new ecs.Cluster(stack, `FlaskCluster${index}`, {
    vpc,
  });

  new DockerImageAsset(stack, `FlaskAppAsset${index}`, {
    directory: path.join(__dirname, 'flask-app'),
  });
});

app.synth();
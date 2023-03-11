import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";


// https://docs.aws.amazon.com/zh_tw/cdk/v2/guide/ecs_example.html


export class EcsHelloworldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3 // Default is all AZs in region
    })

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    })

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'MyTaskDefinition', {
    });

    taskDefinition.addContainer("myContainer", {
      image: ecs.ContainerImage.fromRegistry("metabase/metabase"),
      cpu: 2048,
      memoryReservationMiB: 4096,
      environment: { "my_key": "my_val" },
    });

    cluster.addCapacity('MyGroupCapacity', {
      instanceType: new ec2.InstanceType("m5.2xlarge"),
      keyName: "yen-dev-key1"
      //desiredCapacity: 2,
    });

    // https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ecs.Ec2ServiceProps.html
    new ecs.Ec2Service(this, "EcsHelloworldService", {
      cluster: cluster,
      taskDefinition: taskDefinition,
    })


    // // Create a load-balanced Fargate service and make it public
    // new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
    //   cluster: cluster, // necessary
    //   cpu: 512, // default : 256
    //   desiredCount: 6, // default : 1
    //   //taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
    //   taskImageOptions: { image: ecs.ContainerImage.fromRegistry("metabase/metabase") },
    //   memoryLimitMiB: 2048,
    //   publicLoadBalancer: true
    // })

  }

}

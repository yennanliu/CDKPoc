import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";


// https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ecs/ecs-service-with-logging/index.ts

export class EcsHelloworld2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //   const vpc = new ec2.Vpc(this, "MyVpc", {
    //     maxAzs: 3 // Default is all AZs in region
    //   })

    //   const cluster = new ecs.Cluster(this, 'Ec2Cluster', {
    //     vpc: vpc
    //   });

    //   cluster.addCapacity('MyAutoScalingGroup', {
    //     instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
    //   });

    //   // create a task definition with CloudWatch Logs
    //   const logging = new ecs.AwsLogDriver({ streamPrefix: "myapp" })

    //   const taskDef = new ecs.Ec2TaskDefinition(this, "MyTaskDefinition");

    //   taskDef.addContainer("AppContainer", {
    //     image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
    //     memoryLimitMiB: 512,
    //     logging,
    //   })

    //   // Instantiate ECS Service with just cluster and image
    //   new ecs.Ec2Service(this, "Ec2Service", {
    //     cluster,
    //     taskDefinition: taskDef,
    //   });


    //   const mySecurityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
    //     vpc,
    //     description: "Allow ssh access to ec2 instances from anywhere",
    //     allowAllOutbound: true,
    //   });
    //   mySecurityGroup.addIngressRule(
    //     ec2.Peer.anyIpv4(),
    //     ec2.Port.tcp(22),
    //     "allow public ssh access"
    //   );

    //   const ec2Instance = new ec2.Instance(this, "Instance", {
    //     vpc,
    //     instanceType: ec2.InstanceType.of(
    //       ec2.InstanceClass.T2,
    //       ec2.InstanceSize.MEDIUM
    //     ),
    //     machineImage: new ec2.AmazonLinuxImage(),
    //     securityGroup: mySecurityGroup,
    //     vpcSubnets: {
    //       subnetType: ec2.SubnetType.PUBLIC,
    //     },
    //     keyName: "yen-dev-key1",
    //   });

    const vpc = new ec2.Vpc(this, "MyVpc", {
      //maxAzs: 3 // Default is all AZs in region
    })


    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    })


    // https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ecs.CfnTaskDefinition.PortMappingProperty.html
    // const portMappingProperty: ecs.CfnTaskDefinition.PortMappingProperty = {
    //   appProtocol: 'myProtocol',
    //   containerPort: 80,
    //   containerPortRange: 'containerPortRange',
    //   hostPort: 3000,
    //   name: 'name',
    //   protocol: 'protocol',
    // };

    //new ecs.PortM(234, 3242);

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // necessary
      cpu: 1024, // default : 256
      desiredCount: 1, // default : 1
      //taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("metabase/metabase") },
      memoryLimitMiB: 1024 * 3,
      publicLoadBalancer: true,
      listenerPort:80
    })

  }

}

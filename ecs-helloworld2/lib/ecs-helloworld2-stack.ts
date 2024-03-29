import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'

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

 
    const domain =`xxx.yyy.yen.com`;
    const zone = new route53.HostedZone(this, "HostedZone", {
      zoneName: domain,
    });
    const certificate = new acm.Certificate(this, "Certificate", {
      domainName: domain,
      subjectAlternativeNames: [`*.${domain}`],
      validation: acm.CertificateValidation.fromDns(zone),
    });

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

    const taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDef");
    taskDefinition.addContainer("DefaultContainer", {
      image: ecs.ContainerImage.fromRegistry("metabase/metabase"),
      portMappings: [
        { containerPort: 3000, hostPort: 3000 },
      ],
    });

    // Create a load-balanced Fargate service and make it public
    // new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
    //   cluster: cluster, // necessary
    //   cpu: 1024, // default : 256
    //   desiredCount: 1, // default : 1
    //   //taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
    //   taskImageOptions: { image: ecs.ContainerImage.fromRegistry("metabase/metabase") },
    //   memoryLimitMiB: 1024 * 3,
    //   publicLoadBalancer: true,
    //   listenerPort:80
    // })

    // const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "Service", {
    //   cluster,
    //   //publicLoadBalancer: true,
    //   assignPublicIp: true,
    //   taskDefinition,
    // });

    const service = new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      assignPublicIp: true,
    });

    const lb = new elb.ApplicationLoadBalancer(this, "LoadBalancer", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("Listener", {
      port: 443,
      certificates: [certificate],
    });

    listener.addTargets("UI", {
      port: 80,
      targets: [service.loadBalancerTarget({ containerName: "DefaultContainer", containerPort: 3000 })],
      healthCheck: {
        healthyHttpCodes: "200-399",
      },
    });

    
    // service.loadBalancer.addRedirect();

    // service.listener.addTargets("api", {
    //   priority: 10,
    //   //conditions: [elb.ListenerCondition.hostHeaders([`api.${domain}`])],
    //   // what to do???
    // });

  }

}

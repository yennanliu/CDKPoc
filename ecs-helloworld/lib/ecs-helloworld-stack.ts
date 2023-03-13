import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

// https://docs.aws.amazon.com/zh_tw/cdk/v2/guide/ecs_example.html
// https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ecs/ecs-network-load-balanced-service/index.ts


export class EcsHelloworldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3 // Default is all AZs in region
    })

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    })

    const mySecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'sg-0cdce0e0f071f8a57', "sg-0cdce0e0f071f8a57", {
      mutable: true,
      allowAllOutbound: true
    })
    // https://stackoverflow.com/questions/57922113/add-ingress-rule-to-security-groups-using-aws-cdk
    mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'SSH frm anywhere');
    mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3000), '3000 port');
    mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), 'all traffic');


    cluster.connections.addSecurityGroup(mySecurityGroup);

    cluster.addCapacity('MyGroupCapacity', {
      instanceType: new ec2.InstanceType("m5.xlarge"),
      keyName: "yen-dev-key1",
      allowAllOutbound: true,
      //associatePublicIpAddress: true,
      //machineImageType: ecs.MachineImageType.BOTTLEROCKET
      //desiredCapacity: 2,
    });

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'MyTaskDefinition', {
    });

    // // https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ecs.Ec2ServiceProps.html
    const service = new ecs.Ec2Service(this, "EcsHelloworldService", {
      cluster: cluster,
      taskDefinition: taskDefinition,
    })

    // const ecsService = new ecs_patterns.NetworkLoadBalancedEc2Service(this, "Ec2Service", {
    //   cluster,
    //   memoryLimitMiB: 1024 * 3,
    //   taskImageOptions: {
    //     image: ecs.ContainerImage.fromRegistry("metabase/metabase"),
    //   }
    // });

    // Need target security group to allow all inbound traffic for
    // ephemeral port range (when host port is 0).
    // const EPHEMERAL_PORT_RANGE = ec2.Port.tcpRange(0, 65535);
    // ecsService.service.connections.allowFromAnyIpv4(EPHEMERAL_PORT_RANGE);

    // new cdk.CfnOutput(this, "networkLoadBalancerURL", {
    //   value: "https://" + ecsService.loadBalancer.loadBalancerDnsName,
    //   description: "Network LoadBalancer URL"
    // });

    const container = taskDefinition.addContainer("myContainer", {
      image: ecs.ContainerImage.fromRegistry("metabase/metabase"),
      cpu: 1024 * 10,
      memoryReservationMiB: 4096,
      memoryLimitMiB: 35000,
      portMappings: [
        {
          containerPort: 3000,
          hostPort: 80
        }
      ],
      environment: { "my_key": "my_val" },
    });

    container.addPortMappings({
      containerPort: 3000,
      hostPort: 80,
      protocol: ecs.Protocol.TCP
    });

    const lb = new elbv2.NetworkLoadBalancer(this, "metabase-nlb", {
      vpc: vpc,
      loadBalancerName: "metabase-lb"
    });

    const listner = lb.addListener("listner", {
      port: 80,
      protocol: elbv2.Protocol.TCP
    })


    //const health_check = lb.h(interval=core.Duration.seconds(30), protocol=nlb.Protocol.TCP)
    listner.addTargets("ECS", {
      port: 80,
      targets: [service],
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

# Custom VPC1

> setup VPC with custom rules
- What's VPC?
    - VPC stands for Virtual Cloud Private Cloud. The easiest way to describe a VPC is as your own private data center within the AWS infrastructure. You get to decide the network addresses that you will use throughout your infrastructure. Since this is your network, you can decide to slice it up any way you prefer.

## Commands

```bash
mkdir custom-vpc1 && cd custom-vpc1
cdk init --language typescript

# update lib/custom-vpc1-stack.ts
# update bin/custom-vpc1.ts

cdk diff
cdk deploy
```

## Ref

- https://catalog.us-east-1.prod.workshops.aws/workshops/5962a836-b214-4fbf-9462-fedba7edcc9b/en-US/the-workshop/2-create-vpc
- https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/neptune-with-vpc
- VPC
    - https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario1.html
    - https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html
    - https://ithelp.ithome.com.tw/articles/10243374
- VPC interface doc
    - https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ec2.SubnetConfiguration.html
    - https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ec2.SubnetType.html

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

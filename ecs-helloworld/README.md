## Run ECS with AWS Fargate

## Commands

```bash
mkdir ecs-helloworld && cd ecs-helloworld
cdk init --language typescript

# update lib/custom-vpc1-stack.ts
# update bin/custom-vpc1.ts

cdk diff
cdk deploy
```

## Ref

- https://docs.aws.amazon.com/zh_tw/cdk/v2/guide/ecs_example.html

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

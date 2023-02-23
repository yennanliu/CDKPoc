# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Steps

```bash
#-----------------------------
# PART 1
#-----------------------------

# init project
cdk init sample-app --language typescript

# install the bootstrap stack into an environment
cdk bootstrap

# Synthesizes and prints the CloudFormation : template for this stack 
cdk synthesize

# diff
cdk diff

# deploy
cdk deploy

# deploy
# which will assess whether a hotswap deployment can be performed instead of a CloudFormation deployment. If possible, the CDK CLI will use AWS service APIs to directly make the changes; otherwise it will fall back to performing a full CloudFormation deployment.
cdk deploy --hotswap

# sync
#  except that instead of being a one-shot operation, it monitors your code and assets for changes and attempts to perform a deployment automatically when a change is detected.
cdk watch

# destroy CDK
cdk destroy CdkWorkshopStack
```

```bash
#-----------------------------
# PART 2
#-----------------------------

# https://cdkworkshop.com/20-typescript/50-table-viewer/200-install.html

# install dep
npm install cdk-dynamo-table-viewer@0.2.0
```

## API

| API | Type | Purpose | Example cmd | Comment|
| ----- | -------- | ---- | ----- | ---- |
| Test | GET | call lambda | https://zzzz.execute-api.us-east-1.amazonaws.com/prod/ |
| Test | GET | call lambda | https://zzzz.execute-api.us-east-1.amazonaws.com/prod/hello |
| Test | GET | call lambda | https://zzzz.execute-api.us-east-1.amazonaws.com/prod/hello/zzzz |
| Test | GET | UI shows dynamo count| https://zzz.execute-api.us-east-1.amazonaws.com/prod/ |

## Ref

- Workshop doc
    - https://cdkworkshop.com/20-typescript/20-create-project/100-cdk-init.html
- CDK constructs
    - https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
- Lib
    - https://www.npmjs.com/package/cdk-dynamo-table-viewer


## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
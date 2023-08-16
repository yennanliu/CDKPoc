# VPC Peering

## Run

```bash
aws configure


cdk init sample-app --language typescript

# show all CDK
cdk list # or : cdk list --long

# (ONLY first time) install the bootstrap stack into an environment, save needed pkg in S3
cdk bootstrap

# Synthesizes and prints the CloudFormation : template for this stack 
cdk synth # or : cdk synthesize

# diff
cdk diff

# deploy
cdk deploy

cdk deploy -c use_vpc=vpc-0305e022402e96765

cdk diff -c use_vpc=vpc-0305e022402e96765
```

## Ref
- https://www.youtube.com/watch?v=puUpjHWW44c

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

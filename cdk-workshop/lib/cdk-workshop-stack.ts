import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from './hitcounter';


// https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X, // exe env
      code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory
      handler: 'hello.handler' // file is "hello", function is "handler"
    }) 

    // defines an API Gateway REST API resource backed by our "hello" function.
    // https://cdkworkshop.com/20-typescript/30-hello-cdk/400-apigw.html
    // new apigw.LambdaRestApi(this, 'Endpoint', {
    //   handler: hello
    // })


    // https://cdkworkshop.com/20-typescript/40-hit-counter/400-use.html
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    })

  
    // https://cdkworkshop.com/20-typescript/30-hello-cdk/100-cleanup.html
    // const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
    // const topic = new sns.Topic(this, 'CdkWorkshopTopic');
    // topic.addSubscription(new subs.SqsSubscription(queue));
  }

}

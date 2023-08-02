import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import * as firehose from 'aws-cdk-lib/aws-kinesisfirehose';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Kinesis Data Stream
    const kinesisStream = new kinesis.Stream(this, 'KinesisStream');

    // Create the S3 bucket for Kinesis Data Firehose to write data to
    const s3Bucket = new s3.Bucket(this, 'FirehoseS3Bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change this if you want to retain the bucket after stack deletion
    });

    // Create the Kinesis Data Firehose delivery stream
    const kinesisFirehose = new firehose.CfnDeliveryStream(this, 'KinesisFirehose', {
      deliveryStreamName: 'MyKinesisFirehose',
      s3DestinationConfiguration: {
        bucketArn: s3Bucket.bucketArn,
        bufferingHints: {
          intervalInSeconds: 60, // Configure buffering as needed
          sizeInMBs: 5,
        },
        compressionFormat: 'UNCOMPRESSED',
        roleArn: 'arn:aws:iam::YOUR_ACCOUNT_ID:role/KinesisFirehoseRole', // Replace with the actual IAM role ARN for Kinesis Firehose
      },
    });

    // Create the CloudWatch Log Group
    const logGroup = new cloudwatch.LogGroup(this, 'LogGroup');

    // Create the CloudWatch Log Metric Filter
    const metricFilter = logGroup.addMetricFilter('MetricFilter', {
      filterPattern: { logPatternString: 'ERROR', },
      metricNamespace: 'MyApp/Errors',
    });

    // Create the EventBridge rule to send matched logs to Kinesis Data Stream
    const rule = new events.Rule(this, 'Rule', {
      eventPattern: {
        source: ['aws.logs'],
        detailType: ['Log Data'],
        detail: {
          'logGroup': [
            logGroup.logGroupName,
          ],
        },
      },
    });

    // Add the Kinesis Data Stream as the target for the EventBridge rule
    rule.addTarget(new targets.KinesisStreamTarget(kinesisStream));

    // Output the ARN of the created S3 bucket
    new cdk.CfnOutput(this, 'S3BucketArn', {
      value: s3Bucket.bucketArn,
    });
  }
}

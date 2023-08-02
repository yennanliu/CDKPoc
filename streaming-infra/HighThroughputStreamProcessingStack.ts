import * as cdk from 'aws-cdk-lib';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import * as kinesisfirehose from 'aws-cdk-lib/aws-kinesisfirehose';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class HighThroughputStreamProcessingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Kinesis Data Stream for data ingestion
    const stream = new kinesis.Stream(this, 'DataStream', {
      shardCount: 10, // Adjust the number of shards based on expected throughput
    });

    // Create an S3 bucket to store the processed data
    const outputBucket = new s3.Bucket(this, 'ProcessedDataBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create an Amazon Kinesis Data Firehose delivery stream to store processed data in S3
    const firehose = new kinesisfirehose.CfnDeliveryStream(this, 'FirehoseDeliveryStream', {
      deliveryStreamName: 'MyDeliveryStream',
      s3DestinationConfiguration: {
        bucketArn: outputBucket.bucketArn,
        bufferingHints: {
          intervalInSeconds: 60, // Configure buffering as needed
          sizeInMBs: 5,
        },
        compressionFormat: 'UNCOMPRESSED',
        roleArn: 'arn:aws:iam::YOUR_ACCOUNT_ID:role/FirehoseRole', // Replace with the actual IAM role ARN for Kinesis Data Firehose
      },
      deliveryStreamType: 'DirectPut', // Directly ingest from Kinesis Data Streams
      kinesisStreamSourceConfiguration: {
        kinesisStreamArn: stream.streamArn,
        roleArn: 'arn:aws:iam::YOUR_ACCOUNT_ID:role/FirehoseRole', // Replace with the same IAM role ARN for Kinesis Data Firehose
      },
    });

    // Grant the Kinesis Data Firehose role permissions to write to the S3 bucket
    outputBucket.grantWrite(new cdk.ServicePrincipal('firehose.amazonaws.com'));

    // Output the ARN of the created S3 bucket and Kinesis Data Stream
    new cdk.CfnOutput(this, 'DataStreamArn', {
      value: stream.streamArn,
    });

    new cdk.CfnOutput(this, 'ProcessedDataBucketArn', {
      value: outputBucket.bucketArn,
    });
  }
}

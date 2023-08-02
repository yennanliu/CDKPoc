import * as cdk from 'aws-cdk-lib';
import * as emr from 'aws-cdk-lib/aws-emr';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyEmrStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for EMR logs and application
    const logBucket = new s3.Bucket(this, 'EmrLogBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change this if you want to retain the bucket after stack deletion
      autoDeleteObjects: true, // Delete objects when the bucket is deleted
    });

    // Create the EMR Cluster
    const emrCluster = new emr.CfnCluster(this, 'EMRCluster', {
      name: 'MyEMRCluster',
      releaseLabel: 'emr-6.4.0', // Replace this with the desired EMR release label
      applications: [
        { name: 'Spark' }, // Use Spark as the application
      ],
      logUri: `s3://${logBucket.bucketName}/emr-logs/`, // Store EMR logs in the S3 bucket
      instances: {
        masterInstanceGroup: {
          instanceCount: 1,
          instanceType: 'm5.xlarge', // Replace this with the desired instance type for the master node
        },
        coreInstanceGroup: {
          instanceCount: 2,
          instanceType: 'm5.xlarge', // Replace this with the desired instance type for the core nodes
        },
      },
      serviceRole: 'EMR_DefaultRole', // Replace with the actual EMR service role ARN
      jobFlowRole: 'EMR_EC2_DefaultRole', // Replace with the actual EMR EC2 role ARN
    });

    // Output the ARN of the created S3 bucket and EMR Cluster
    new cdk.CfnOutput(this, 'EmrLogBucketArn', {
      value: logBucket.bucketArn,
    });

    new cdk.CfnOutput(this, 'EMRClusterId', {
      value: emrCluster.ref,
    });

    // Add the bootstrap action to copy the application JAR to EMR cluster
    emrCluster.addBootstrapAction({
      name: 'Copy App Jar to EMR',
      scriptBootstrapAction: {
        path: `s3://${logBucket.bucketName}/path/to/your/app.jar`, // Replace with the S3 path of your application JAR
      },
    });

    // Add the EMR step to execute your Spark job
    emrCluster.addStep({
      name: 'Run Spark Job',
      actionOnFailure: 'TERMINATE_CLUSTER', // Adjust this based on your requirements
      hadoopJarStep: {
        jar: 'command-runner.jar',
        args: [
          'spark-submit',
          '--class', 'your.spark.application.MainClass', // Replace with the fully qualified class name of your Spark application
          '--deploy-mode', 'cluster',
          '--master', 'yarn',
          's3://${logBucket.bucketName}/path/to/your/app.jar', // Replace with the S3 path of your application JAR
          'arg1', // Replace with your Spark application arguments, if any
          'arg2',
        ],
      },
    });
  }
}

// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// // import * as sqs from 'aws-cdk-lib/aws-sqs';
// import { StaticSite } from './static-site';

// // https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/static-site/index.ts

// export class CloudFrontStaticSite1Stack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     new StaticSite(this, 'StaticSite', {
//       domainName: this.node.tryGetContext('domain'),
//       siteSubDomain: this.node.tryGetContext('subdomain'),
//     })
//   }
// }

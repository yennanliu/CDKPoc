#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
//import { CloudFrontStaticSite1Stack } from '../lib/cloud_front-static-site1-stack';
import { StaticSite } from '../static-site';

// https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/static-site/index.ts

class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
      super(parent, name, props);

      new StaticSite(this, 'StaticSite', {
          domainName: 'mystaticsite.com', //this.node.tryGetContext('domain'),
          siteSubDomain: 'www', //this.node.tryGetContext('subdomain'),
      });
  }
}


const app = new cdk.App();
// new CloudFrontStaticSite1Stack(app, 'CloudFrontStaticSite1Stack', {
// });
new MyStaticSiteStack(app, 'MyStaticSite', {
  /**
   * This is required for our use of hosted-zone lookup.
   *
   * Lookups do not work at all without an explicit environment
   * specified; to use them, you must specify env.
   * @see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
   */
  env: {
      account: app.node.tryGetContext('accountId'),
      /**
       * Stack must be in us-east-1, because the ACM certificate for a
       * global CloudFront distribution must be requested in us-east-1.
       */
      region: 'us-east-1',
  }
});

app.synth();
#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CloudFrontStaticSite2Stack } from '../lib/cloud_front-static-site2-stack';
import 'source-map-support/register';

// https://github.com/idanlupinsky/static-site-infra-demo/blob/main/bin/static-site-infra-demo.ts

// const app = new cdk.App();
// new CloudFrontStaticSite2Stack(app, 'CloudFrontStaticSite2Stack');
const app = new cdk.App();
new CloudFrontStaticSite2Stack(app, 'StaticSiteInfraDemoStack', {
    env: { account: '11111111111', region: 'eu-central-1' },
});
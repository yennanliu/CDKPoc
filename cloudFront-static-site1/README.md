# CloudFront-static-site1

> Static HTML site with S3, and Cloudfront

## Command
```bash

#cdk deploy -c accountId=123456789 -c domain=mystaticsite.com -c subdomain=www
cdk deploy -c accountId=1111111 domain=mystaticsite.com -c subdomain=www
```

## Ref
- https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/static-site
- https://idanlupinsky.com/blog/static-site-deployment-using-aws-cloudfront-and-the-cdk/
	- https://github.com/idanlupinsky/static-site-infra-demo
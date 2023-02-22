// https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html
// https://cdkworkshop.com/20-typescript/30-hello-cdk/300-cdk-watch.html

exports.handler = async function(event) {
    console.log(">>> lambda start");
    console.log("request:", JSON.stringify(event, undefined, 2));
    console.log(">>> lambda end");
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `GOOD Night, CDK! You've hit ${event.path}\n`
    };
  };
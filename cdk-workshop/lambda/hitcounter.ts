// https://cdkworkshop.com/20-typescript/40-hit-counter/200-handler.html

const { DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function (event: any){

    console.log(">>> request:", JSON.stringify(event, undefined, 2));

     // create AWS SDK clients
     const dynamo = new DynamoDB();
     const lambda = new Lambda();

     // update dynamo entry for "path" with hits++
    await dynamo.update({
        TableName: process.env.HITS_TABLE_NAME, // HITS_TABLE_NAME is the name of the DynamoDB table to use for storage.
        Key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1' } }
    }).promise();

    // call downstream function and capture response
    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME, // DOWNSTREAM_FUNCTION_NAME is the name of the downstream AWS Lambda function.
        Payload: JSON.stringify(event)
    }).promise();


    console.log('>>> downstream response:', JSON.stringify(resp, undefined, 2));

     // return response back to upstream caller
     return JSON.parse(resp.Payload);
}
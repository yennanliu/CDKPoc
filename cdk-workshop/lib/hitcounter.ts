import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

// https://cdkworkshop.com/20-typescript/40-hit-counter/100-api.html

export interface HitCounterProps{

     /** the function for which we want to count url hits **/
     downstream: lambda.IFunction;
}

export class HitCounter extends Construct{

    /** allows accessing the counter function */
    public readonly handler: lambda.Function;

    constructor(scope: Construct, id: string, props: HitCounterProps){
        super(scope, id);
        // https://cdkworkshop.com/20-typescript/40-hit-counter/300-resources.html

        const table = new DynamoDB.table(this, 'Hits', { // TODO : double check this
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        } )

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        })

    }
}
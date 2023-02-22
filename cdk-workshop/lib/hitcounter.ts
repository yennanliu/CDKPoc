import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

// https://cdkworkshop.com/20-typescript/40-hit-counter/100-api.html

export interface HitCounterProps{

     /** the function for which we want to count url hits **/
     downstream: lambda.IFunction;
}

export class HitCounter extends Construct{
    constructor(scope: Construct, id:String, props: HitCounterProps){
        super(scope, id);
        // 
    }
}
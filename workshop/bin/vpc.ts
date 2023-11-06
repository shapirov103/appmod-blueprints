
import VpcStack from '../lib/infra/vpc';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const props: cdk.StackProps = {
    env:{
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
}
const vpcStack = new VpcStack(app, "appmod-vpc-stack", props);
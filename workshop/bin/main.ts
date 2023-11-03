import  HybridCluster from '../lib/blueprints/hybrid';
import PipelineStack from '../lib/blueprints/pipeline';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const props: cdk.StackProps = {
    env:{
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
}


HybridCluster.build(app, props);
PipelineStack.build(app, props);


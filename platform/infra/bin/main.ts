import  HybridCluster from '../lib/blueprints/hybrid';
import PipelineStack from '../lib/blueprints/pipeline';
import CodeCommitStack from '../lib/codecommit/repository';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

HybridCluster.build(app);
PipelineStack.build(app);

new CodeCommitStack(app, 'code-commit-repo');

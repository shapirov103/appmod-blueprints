import  HybridCluster from '../lib/blueprints/hybrid';
import CodeCommitStack from '../lib/codecommit/repository';

import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

HybridCluster.build(app);

new CodeCommitStack(app, 'CodeCommitStack');

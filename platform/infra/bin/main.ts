import  HybridCluster from '../lib/blueprints/hybrid';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

HybridCluster.build(app);

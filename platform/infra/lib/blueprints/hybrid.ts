import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export default class HybridCluster {
    static build(scope: Construct) {
        blueprints.EksBlueprint.builder()
            .version("auto")
            .addOns(
                new blueprints.AwsLoadBalancerControllerAddOn,
                new blueprints.VpcCniAddOn, 
                new blueprints.MetricsServerAddOn,
                new blueprints.ClusterAutoScalerAddOn,
            )
            .build(scope, "hybrid-cluster");
    }
}
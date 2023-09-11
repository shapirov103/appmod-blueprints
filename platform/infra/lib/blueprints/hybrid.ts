import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { KubevelaAddon } from '../addons/kubevela';

const GIT_URL = "https://github.com/shapirov103/appmod-blueprints";

export default class HybridCluster {
    static build(scope: Construct) {
        blueprints.EksBlueprint.builder()
            .version("auto")
            .addOns(
                new blueprints.AwsLoadBalancerControllerAddOn,
                new blueprints.VpcCniAddOn, 
                new blueprints.MetricsServerAddOn,
                new blueprints.ClusterAutoScalerAddOn,
                new KubevelaAddon(),
                new blueprints.SecretsStoreAddOn(),
                new blueprints.ArgoCDAddOn({
                    bootstrapRepo: {
                        repoUrl: GIT_URL,
                        path: 'platform/gitops/addons/mongo',
                        credentialsSecretName: 'github-ssh-key',
                        credentialsType: 'SSH'
                    }
                })
            )
            .build(scope, "hybrid-cluster");
    }
}
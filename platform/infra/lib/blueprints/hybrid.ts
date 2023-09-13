import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { KubevelaAddon } from '../addons/kubevela';
import { tagAsg } from '@aws-quickstart/eks-blueprints/dist/utils';

const GIT_URL = "git@github.com:shapirov103/appmod-blueprints.git";

export default class HybridCluster {
    static build(scope: Construct) {
        blueprints.EksBlueprint.builder()
            .version("auto")
            .addOns(
                new blueprints.AwsLoadBalancerControllerAddOn,
                new blueprints.VpcCniAddOn, 
                new blueprints.MetricsServerAddOn,
                new blueprints.ClusterAutoScalerAddOn,
                new blueprints.SecretsStoreAddOn(),
                new blueprints.ArgoCDAddOn({
                    bootstrapRepo: {
                        repoUrl: GIT_URL,
                        targetRevision: "yogeshArgoCD",
                        path: 'deployment/env/dev',
                        credentialsSecretName: 'github-ssh-key',
                        credentialsType: 'SSH'
                    }
                })
            )
            .build(scope, "hybrid-cluster");
    }
}

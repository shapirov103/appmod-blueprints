import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { KubevelaAddon } from '../addons/kubevela';
import { tagAsg } from '@aws-quickstart/eks-blueprints/dist/utils';

const GIT_URL = "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/appmod-workshop";

export default class PipelineStack {
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
                        targetRevision: "main",
                        path: 'deployment/envs/dev',
                        credentialsSecretName: 'argo-repo-secret',
                        credentialsType: 'USERNAME'
                    },
                    //adminPasswordSecretName: 'argocd-admin-secret',
                })
            )
            .build(scope, "dev-cluster");
    }
}
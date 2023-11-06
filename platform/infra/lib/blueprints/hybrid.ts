import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { VpcLookupByNameProvider } from './vpcprovider';
import { StackProps } from 'aws-cdk-lib';

const GIT_URL = "git@github.com:shapirov103/appmod-blueprints.git";

export default class HybridCluster {
    static build(scope: Construct, props: StackProps) {
        blueprints.EksBlueprint.builder()
            .version("auto")
            .resourceProvider(blueprints.GlobalResources.Vpc, new VpcLookupByNameProvider("appmod-vpc"))
            .region(props.env!.region)
            .addOns(
                new blueprints.AwsLoadBalancerControllerAddOn,
                new blueprints.VpcCniAddOn, 
                new blueprints.MetricsServerAddOn,
                new blueprints.ClusterAutoScalerAddOn,
                new blueprints.SecretsStoreAddOn(),
                new blueprints.NginxAddOn(),
                new blueprints.ArgoCDAddOn({
                   bootstrapRepo: {
                     repoUrl: GIT_URL,
                        targetRevision: "feature/progressive-delivery",
                        path: 'deployment/envs/dev',
                        credentialsSecretName: 'github-ssh-key',
                        credentialsType: 'SSH'
                    },
                    adminPasswordSecretName: 'argocd-admin-secret'
               })
            )
            .build(scope, "hybrid-cluster");
    }
}

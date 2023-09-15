# Running App Blueprints with CodeCommit

The Application Blueprints support AWS CodeCommit Repository.

## Create CodeCommit Repo

Prereqs: target account/region is bootstrapped with CDK. 

To create an example CodeCommit repository populated with the GitOps-managed add-ons and example applications:

```bash
cd  platform/infra
# if needed
npm i
cdk deploy code-commit-repo
```

The stack will output both HTTP and SSH URL to access the repo, for example:

```json
code-commit-repo.GitRepository = {"repositoryName":"appmod-workshop",
"repositoryCloneUrlHttp":"https://git-codecommit.us-east-1.amazonaws.com/v1/repos/appmod-workshop",
"repositoryCloneUrlSsh":"ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/appmod-workshop"
}
```



## Client Access

For client access customers are expected to install a helper tool for CodeCommit authentication from git CLI:

```bash
 pip install git-remote-codecommit
```

For more information on installing the authentication helper tool and authenticated access to CodeCommit from git, please refer to the [official docs](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-git-remote-codecommit.html). 

After the tool is installed you can clone the repo identified under `repositoryCloneUrlHttp`.

```
git clone codecommit://appmod-workshop
```

## ArgoCD Support for CodeCommit

ArgoCD can be configured to work with CodeCommit similar to the approaches described under [private repositories](https://aws-quickstart.github.io/cdk-eks-blueprints/addons/argo-cd/#private-repositories) on EKS Blueprints.


It requires customers to create an IAM user with proper permission set for CodeCommit access and associate Git credentials with that user as described [here](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html).

Using the provisioned git credentials, customers are expected to create a secret in AWS Secrets Manager with the following key/values:

`url`: use the  `repositoryCloneUrlHttp` from stack output
`username`: use username created for Git credentials
`password`: use password from from Git credentials

Then configure the blueprint to work with Code Commit repository that contains GitOps descriptors:

Example Blueprint:

```typescript
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

const GIT_URL = "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/appmod-workshop"; // replace with your repo

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
                        targetRevision: "main",
                        path: 'deployment/envs/dev',
                        credentialsSecretName: 'argo-repo-secret',
                        credentialsType: 'USERNAME'
                    },
                })
            )
            .build(scope, "hybrid-cluster");
    }
}
```
# How to use Infra

## Prereqs:

```bash
brew install node
sudo npm install -g n
sudo n stable 

cd platform/infra
npm i 
```

If your target account/region has not been bootstrapped to allow CDK deplyment, run the following command (only once for each account/region):

```bash
cdk bootstrap cdk bootstrap aws://<your-account-number>/<region-to-bootstrap>
```

## Deploy Hybrid cluster

To deploy the Hybrid cluster that represents a non-modernized cluster that is intended to be modernized use the following:

```bash
cdk deploy hybrid-cluster # this assumes that your AWS profile points to the right account/region
```

Once the cluster is deployed you can access it with `kubectl` if you configure the kube context based on your credentials. To do that
locate the output of the `cdk deploy` command above that contains `ConfigCommand` and run the command `aws eks update-kubeconfig` locally.

Example output:

```
hybrid-cluster.hybridclusterConfigCommand1C286A33 = aws eks update-kubeconfig ... 
```


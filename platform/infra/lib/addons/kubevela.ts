import * as blueprints from "@aws-quickstart/eks-blueprints";
import { HelmChartConfiguration } from "@aws-quickstart/eks-blueprints/dist/addons/helm-addon/kubectl-provider";
import { Construct } from "constructs";

export interface KubevelaAddOnProps  extends blueprints.HelmAddOnUserProps {
    createNamespace?: boolean;
}

const defaultProps: HelmChartConfiguration & KubevelaAddOnProps = {
    createNamespace: true,
    name: "kubevela",
    namespace: "vela-system",
    chart: "vela-core",
    release: "vela-core",
    repository: "https://kubevela.github.io/charts",
    version: "1.9.6",
    skipVersionValidation: false
}

export class KubevelaAddon extends blueprints.HelmAddOn {

    readonly options: KubevelaAddOnProps;

    constructor(props?: KubevelaAddOnProps) {
        super({ ...defaultProps, ...props });
        this.options = this.props;
    }

    deploy(clusterInfo: blueprints.ClusterInfo): Promise<Construct> {
        const chart = this.addHelmChart(clusterInfo, this.options.values, this.options.createNamespace, true);
        return Promise.resolve(chart);
    }

}
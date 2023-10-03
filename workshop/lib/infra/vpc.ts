import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc, Vpc, SubnetType, IpAddresses, ISubnet } from "aws-cdk-lib/aws-ec2";
import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";

export default class VpcStack extends Stack {

    readonly vpc: IVpc;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        this.vpc = new Vpc(this, "appmod-vpc", {
            vpcName: "appmod-vpc",
            maxAzs: 3,
            ipAddresses: IpAddresses.cidr('192.168.0.0/16'),
            subnetConfiguration: [
                {
                  cidrMask: 19,
                  name: 'public-subnet',
                  subnetType: SubnetType.PUBLIC,
                },
                {
                  cidrMask: 19,
                  name: 'private-egress-subnet',
                  subnetType: SubnetType.PRIVATE_WITH_EGRESS,
                }
            ]
        });

        const publicSubnets = this.vpc.selectSubnets({
            subnetType: SubnetType.PUBLIC
        }).subnets;

        const privateSubnets = this.vpc.selectSubnets({
            subnetType: SubnetType.PRIVATE_WITH_EGRESS
        }).subnets;

        let clusterLabels: string[] = ['kubernetes.io/cluster/hybrid-cluster','kubernetes.io/cluster/dev-stage-blueprint', 'kubernetes.io/cluster/prod-stage-blueprint']
        
        let i = 0;
        privateSubnets.forEach((subnet) => {
            cdk.Tags.of(subnet).add(clusterLabels[i],'shared');
            i++;
        })

        publicSubnets.forEach((subnet) => {
            cdk.Tags.of(subnet).add('kubernetes.io/role/elb', '1')
        })
    }
}
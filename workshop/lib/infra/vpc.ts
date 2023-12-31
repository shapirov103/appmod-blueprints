import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { IVpc, Vpc, SubnetType, IpAddresses, ISubnet } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export default class VpcStack extends Stack {

    readonly vpc: IVpc;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // Single VPC with 3 AZs, each AZ with public and private subnet.
        // All subnets will be shared amongst the three clusters: hybrid, dev, and prod
        this.vpc = new Vpc(this, "appmod-vpc", {
            vpcName: "appmod-vpc",
            maxAzs: 3,
            ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
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

        // Tagging each subnet

        const publicSubnets = this.vpc.selectSubnets({
            subnetType: SubnetType.PUBLIC
        }).subnets;

        const privateSubnets = this.vpc.selectSubnets({
            subnetType: SubnetType.PRIVATE_WITH_EGRESS
        }).subnets;

        function assignClusterTags(subnet : ISubnet): void {
            Tags.of(subnet).add('kubernetes.io/cluster/hybrid-cluster','shared');
            Tags.of(subnet).add('kubernetes.io/cluster/dev-stage-blueprint','shared');
            Tags.of(subnet).add('kubernetes.io/cluster/prod-stage-blueprint','shared');
        }

        privateSubnets.forEach((subnet) => {
            Tags.of(subnet).add('kubernetes.io/role/internal-elb', '1')
            assignClusterTags(subnet)
        })

        publicSubnets.forEach((subnet) => {
            Tags.of(subnet).add('kubernetes.io/role/elb', '1')
            assignClusterTags(subnet)
        })
    }
}
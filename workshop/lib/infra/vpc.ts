import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export default class VpcStack extends Stack {

    readonly vpc: IVpc;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        this.vpc = new Vpc(this, "appmod-vpc", {
            vpcName: "appmod-vpc"
        });
    }

}
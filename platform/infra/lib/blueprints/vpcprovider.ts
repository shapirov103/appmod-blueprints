import { ResourceContext, ResourceProvider } from "@aws-quickstart/eks-blueprints";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";

export class VpcLookupByNameProvider implements ResourceProvider<IVpc> {

    constructor(readonly vpcName: string) { }
 
    provide(context: ResourceContext): IVpc {
        return Vpc.fromLookup(context.scope, 'blueprints-vpc', { vpcName: this.vpcName });
    }
    
}

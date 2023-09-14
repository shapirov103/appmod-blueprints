import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { join } from 'path';

export default class CodeCommitStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const repo = new codecommit.Repository(this, 'Repository', {
            repositoryName: 'appmod-workshop',
            code: codecommit.Code.fromDirectory(join(__dirname, '../../../../deployment')), // optional property, branch parameter can be omitted
          });


        new CfnOutput(this, "Git Repository", { value: JSON.stringify({            repositoryName: repo.repositoryName,
            repositoryCloneUrlHttp: repo.repositoryCloneUrlHttp,
            repositoryCloneUrlSsh: repo.repositoryCloneUrlSsh
            })
        });
    }


}


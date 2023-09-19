import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { join } from 'path';
import fs from 'fs';

const RELATIVE_ROOT = "../../../../";

export default class CodeCommitStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        CodeCommitStack.createCodeBundle("deployment", "applications");
        const repo = new codecommit.Repository(this, 'Repository', {
            repositoryName: 'appmod-workshop',
            code: codecommit.Code.fromDirectory(join(__dirname, RELATIVE_ROOT, '.tmp')), // optional property, branch parameter can be omitted
        });

        new CfnOutput(this, "Git Repository", {
            value: JSON.stringify({
                repositoryName: repo.repositoryName,
                repositoryCloneUrlHttp: repo.repositoryCloneUrlHttp,
                repositoryCloneUrlSsh: repo.repositoryCloneUrlSsh
            })
        });
    }

    /**
     * Create code bundle under .tmp directory.
     */
    public static createCodeBundle(...relativePaths: string[]) {
        const dir = join(__dirname, RELATIVE_ROOT, '.tmp');

        // if (fs.existsSync(dir)) {
        //     fs.rmSync(dir, { recursive: true, force: true });
        // }
        ensureDir(dir);

        relativePaths.forEach(path => {
            const dest = join(dir, path);
            ensureDir(dest);
            fs.cpSync(join(__dirname, RELATIVE_ROOT, path), dest, {recursive :true, force: true});
        });
    }
}


function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
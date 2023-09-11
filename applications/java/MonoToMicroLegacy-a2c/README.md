# appmod-blueprints
This is the sample Java application which is running on EC2

## High level Steps

1. Deploy AWS CloudFormation template app2containersetup.yaml in us-west-2 region

2. Assuming EKS cluster is already created and provisioned

3. Create the namespace on Kubernetes 

`kubectl creat ns java-tomcat`

4. Download and install the App2Container, follow the links of  Module 1 from https://catalog.us-east-1.prod.workshops.aws/workshops/2c1e5f50-0ebe-4c02-a957-8a71ba1e8c89/en-US/java-modernize-your-app/java-containerize-your-app/java-containerize-your-app-ecs/java-create-deployment-artifacts

5. Above step will create the Docker image, create ECR and push the image to repo

6. Use Kubernetes artifacts to deploy application on target EKS

`kubectl create -f eks_deployment.yaml`
`kubectl create -f eks_service.yaml`

## Please note: As database is still running on premise so only web functionality will work, otherwise please migrate the DB to RDS and point application to RDS

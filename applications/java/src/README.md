# appmod-blueprints
This is the sample Java application which is running on EKS

## High level Steps

1. User modify the source code. Go to src --> main and make the changes in index.jsp for trial purpose 

2. Assuming EKS cluster is already created and provisioned

3. Create the namespace on Kubernetes 

`kubectl create ns appmod-java`


4. Rebuild the image using command
`docker build -t appmod-java .`

5. Push the image to public ECR
`docker tag appmod-java:latest public.ecr.aws/i8e1q7x5/appmod-demo:latest`
`docker push public.ecr.aws/i8e1q7x5/appmod-demo:latest`

6. Use Kubernetes artifacts to deploy application on target EKS

`kubectl create -f eks_deployment.yaml`
`kubectl create -f eks_service.yaml`


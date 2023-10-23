# Instructions for the Java Code functional testing

## This part has following components

1. javaFunctest.sh - Shell script which is accpeting two input parameters i.e Ingress hostname and the Color which should fail functional test

2. Dockerfile - Creating the custom image for testing

## Image is storing on following public ECR

public.ecr.aws/i8e1q7x5/appmod-javafunctest:latest

## Instructions for usage 

Pass on the two parameters which will be processed by image

**Its tested using following command**

1. Failed Secnario:

```
 docker run -t -i javafunctest k8s-kubesyst-blueprin-0c01003f1d-162a005a49a46d55.elb.us-west-2.amazonaws.com red

```

Following is the output

```
This script is performing the Funnctional test for Java application
Based on the input parameter, color marked will be deemded as functionality failure
The number of arguments is: 2
Functional test failed: Mentioned Colour Found
```

2. Success Scenario:

```
docker run -t -i javafunctest k8s-kubesyst-blueprin-0c01003f1d-162a005a49a46d55.elb.us-west-2.amazonaws.com green

```

Following is the output

```
This script is performing the Funnctional test for Java application
Based on the input parameter, color marked will be deemded as functionality failure
The number of arguments is: 2
Functional test successful: Mentioned Colour Not Found

```

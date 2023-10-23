# Instructions for the Java Code functional testing

## This part has following components

1. javaPerftest.sh - Shell script which is accpeting one input parameters i.e Ingress hostname, it uses the Apache benchmarking tool to generate report

2. Dockerfile - Creating the custom image for testing

3.javaPerf-job.yaml - It deploys the kubernetes job which accepts the argument and run the test

## Image is storing on following public ECR
public.ecr.aws/i8e1q7x5/javaperftest:latest


## Instructions for usage 

Pass on the two parameters which will be processed by image

**Its tested using following command**

1. Failed Secnario

```
kubectl creat -f javaPerf-job.yaml -n team-j
```

Following is the output

```
This script is performing the Performance test for Java application
Based on the input parameter, color marked will be deemded as functionality failure
Please enter the Java application ingress url
The number of arguments is: 1
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking k8s-kubesyst-blueprin-8bec7badbc-8ff52b36b01c1ee9.elb.us-west-2.amazonaws.com (be patient).....done


Server Software:        nginx/1.25.2
Server Hostname:        k8s-kubesyst-blueprin-8bec7badbc-8ff52b36b01c1ee9.elb.us-west-2.amazonaws.com
Server Port:            80

Document Path:          /java-app
Document Length:        0 bytes

Concurrency Level:      10
Time taken for tests:   0.016 seconds
Complete requests:      10
Failed requests:        0
Non-2xx responses:      10
Keep-Alive requests:    0
Total transferred:      1170 bytes
HTML transferred:       0 bytes
Requests per second:    629.92 [#/sec] (mean)
Time per request:       15.875 [ms] (mean)
Time per request:       1.587 [ms] (mean, across all concurrent requests)
Transfer rate:          71.97 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    2   0.2      2       3
apiVersion: batch/v1
Processing:     4    6   0.9      6       7
Waiting:        4    6   0.9      6       7
Total:          6    8   0.9      8       9

Percentage of the requests served within a certain time (ms)
  50%      8
  66%      8
  75%      8
  80%      9
  90%      9
  95%      9
  98%      9
  99%      9
 100%      9 (longest request)
Total Time per Request is: 15.875 ms
Performance test FAILED, average request time is: 15.875 ms
```


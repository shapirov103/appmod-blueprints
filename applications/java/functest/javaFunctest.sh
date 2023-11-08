#!/bin/bash
echo "This script is performing the Functional test for Java application"

echo "The expected color is defined by the input parameter. Failure: if the color output by the app is different than the expected"

echo "The number of arguments is: $#"
a=$#
echo "Arguments are $1 and $2"

clusterIP=$1
failedColor=$2

curl -s "http://${clusterIP}/java-app/" > /tmp/curlout
 if grep -q -i "$failedColor" /tmp/curlout
then
    echo "Functional test SUCCESS: Expected Color $2 Found"  
   
    exit 0 
else
    echo "Functional test FAILED: Expected color $2  Not Found"  

    exit 1 
fi

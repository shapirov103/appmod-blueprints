#!/bin/bash
echo "This script is performing the Funnctional test for Java application"

echo "Based on the input parameter, color marked will be deemded as functionality failure"

echo "The number of arguments is: $#"
a=$#
if [ $a -ne 2 ]
then
 
echo "Two parameters are expected"
exit 1

fi

clusterIP=$1
failedColor=$2

curl -s "http://${clusterIP}/java-app/" > /tmp/curlout
 if grep -q -i "$failedColor" /tmp/curlout
then
    echo "Functional test failed: Mentioned Colour Found"  
   
    exit 1
else
    echo "Functional test successful: Mentioned Colour Not Found"  

    exit 0
fi
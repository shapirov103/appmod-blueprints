#!/bin/bash
echo "This script is performing the Performance test for Java application"

echo "Based on the input parameter, color marked will be deemded as functionality failure"
echo "Please enter the Java application ingress url and the expected average request time"
echo "The number of arguments is: $#"
a=$#
if [ $a -lt 2 ]
then
 
echo "Atleast two parameters are expected"
exit 1

fi

INGRESS_URL=$1
REQUESTED_TIMEOUT=`echo $2`

INT_REQUEST_TO=${REQUESTED_TIMEOUT%.*}

touch /tmp/perfTestResults.out
>/tmp/perfTestResults.out
ab -n 1000 -c 10 -k "http://$INGRESS_URL/java-app"> /tmp/perfTestResults.out
cat /tmp/perfTestResults.out

TotalTimeRequest=`cat /tmp/perfTestResults.out| grep "Time per request" |head -1 | awk -F':' '{print $2}'| awk -F' ' '{print $1}'`
echo "Total Time per Request is: $TotalTimeRequest ms"
DECIMAL=`echo $TotalTimeRequest`
INTEGER=${DECIMAL%.*}
echo "Integer is $INTEGER"
echo "RTO uis $INT_REQUEST_TO"
if [ "$INTEGER" -le "$INT_REQUEST_TO" ]; then
	echo "Performance test PASSED, average request time is: $TotalTimeRequest ms"
	exit 0
else
    echo "Performance test FAILED, average request time is: $TotalTimeRequest ms"
        exit 1
fi

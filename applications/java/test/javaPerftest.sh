#!/bin/bash
echo "This script is performing the Performance test for Java application"

echo "Based on the input parameter, color marked will be deemded as functionality failure"
echo "Please enter the Java application ingress url"
echo "The number of arguments is: $#"
a=$#
if [ $a -ne 1 ]
then
 
echo "One parameter is expected"
exit 1

fi
touch /tmp/timespent.out
>/tmp/timespent.out
INGRESSURL=$1
rgs=()
for i in {1..10};
do
curl -o /dev/null -s -w 'Total: %{time_total}s\n' "http://$INGRESSURL/java-app/" >> /tmp/timespent.out

done
cat /tmp/timespent.out


cat /tmp/timespent.out | while read line 

do

echo $line | sed -e 's/[^0-9 ]//g'
done

FROM openjdk:11.0.7-jdk
RUN apt-get update && apt-get install -y unzip && apt-get install -y tomcat9 tomcat9-admin libtomcat9-embed-java libtomcat9-java  
COPY *.war /.
RUN mkdir /usr/share/tomcat9/webapps
RUN mkdir /usr/share/tomcat9/conf/
RUN mkdir /usr/share/tomcat9/temp/
RUN mkdir /usr/share/tomcat9/logs
RUN mkdir /usr/share/tomcat9/work
RUN cp /*.war /usr/share/tomcat9/webapps/.
WORKDIR /usr/share/tomcat9
RUN cp /usr/share/tomcat9/etc/* /usr/share/tomcat9/conf/.
CMD [ "/usr/share/tomcat9/bin/catalina.sh", "run" ] 

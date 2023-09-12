FROM openjdk:11.0.7-jdk
RUN apt-get update && apt-get install -y unzip && apt-get install -y tomcat9 tomcat9-admin libtomcat9-embed-java libtomcat9-java  
WORKDIR /gradle
RUN curl -L https://services.gradle.org/distributions/gradle-7.3.1-bin.zip -o gradle-7.3.1-bin.zip
RUN unzip gradle-7.3.1-bin.zip
ENV GRADLE_HOME=/gradle/gradle-7.3.1
ENV PATH=$PATH:$GRADLE_HOME/bin
RUN gradle --version
COPY src /app/src
COPY build.gradle /app/.
WORKDIR /app
RUN gradle clean build
RUN mkdir /usr/share/tomcat9/webapps
RUN mkdir /usr/share/tomcat9/conf/
RUN mkdir /usr/share/tomcat9/temp/
RUN mkdir /usr/share/tomcat9/logs
RUN mkdir /usr/share/tomcat9/work
RUN cp build/libs/app.war /usr/share/tomcat9/webapps/.
WORKDIR /usr/share/tomcat9
RUN cp /usr/share/tomcat9/etc/* /usr/share/tomcat9/conf/.
CMD [ "/usr/share/tomcat9/bin/catalina.sh", "run" ] 

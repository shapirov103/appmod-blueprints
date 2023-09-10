FROM gradle:4.7.0-jdk8-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:8-jre-slim

EXPOSE 8080

RUN mkdir /app

COPY sample-java /app/.
WORKDIR /app/sample-java
RUN gradle clean build
FROM tomcat

CMD ["catalina.sh", "run"]


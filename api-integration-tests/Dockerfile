FROM maven:3.8.6-jdk-8-slim
RUN mkdir /api-test
WORKDIR /api-test
COPY ./src ./src
COPY ./pom.xml ./pom.xml
Run mvn install
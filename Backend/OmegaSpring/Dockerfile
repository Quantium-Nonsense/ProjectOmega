# Start with a base image containing Java runtime (mine java 8)
FROM adoptopenjdk/openjdk11:alpine-jre
#FROM openjdk:8u212-jdk-slim##########

#Author
#MAINTAINER
LABEL maintainer=omega.com

# The application's jar file (when packaged)
ARG JAR_FILE=target/*.jar

# Make port 8080 available to the world outside this container
EXPOSE 5000

# Add a volume pointing to /tmp
VOLUME /tmp

# Add the application's jar to the container
#ADD ${JAR_FILE} codestatebkend.jar#############
COPY ${JAR_FILE} app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]

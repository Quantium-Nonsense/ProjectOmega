
    #   Each instruction in a Dockerfile creates a layer in the image.
    #   When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt.
    #   This is part of what makes images so lightweight, small, and fast,
    #   when compared to other virtualization technologies.
    #   A Spring Boot fat jar naturally has "layers" because of the way that the jar itself is packaged.
    #   If we unpack it first it will already be divided into external and internal dependencies.
    #   Note that during image creation, each instruction represents a read-only (delta) image layer.
    #   And that on instruction execution docker looks for an existing image in its cache that can be reuse
    #   rather than creating new (duplicated) image.
    #   To do this in one step in the docker build, we need to unpack the jar first.

    # Start with a base image containing Java runtime
#FROM openjdk:8u212-jdk-slim
FROM adoptopenjdk/openjdk11:alpine-jre
#FROM openjdk:11.0-jre-stretch


    # we use the maven-dependency-plugin to unpack the fat jar under target/dependency
    # then we copy /BOOT-INF/lib, /BOOT-INF/classes and /META-INF to the base image
WORKDIR /usr/share/omega-k8s
ARG DEPENDENCY=target/dependency
ARG appDir=/usr/share/omega-k8s
COPY ${DEPENDENCY}/BOOT-INF/lib ${appDir}/lib
COPY ${DEPENDENCY}/META-INF ${appDir}/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes ${appDir}

    #VM: Make port 5000 available to the world outside this container
EXPOSE 5000

    #Then in the ENTRYPOINT we run the main class by specifying the classpath
    #VM: Run the jar file
ENTRYPOINT ["java","-cp","com/project/omega/*:lib/*:.","com.project.Application"]
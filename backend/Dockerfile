FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /usr/share/omega-k8s
ARG DEPENDENCY=target/dependency
ARG appDir=/usr/share/omega-k8s
COPY ${DEPENDENCY}/BOOT-INF/lib ${appDir}/lib
COPY ${DEPENDENCY}/META-INF ${appDir}/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes ${appDir}
EXPOSE 5000
ENTRYPOINT ["java","-cp","com/project/omega/*:lib/*:.","com.project.Application"]
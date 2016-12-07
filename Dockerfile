FROM java:openjdk-8-jdk

ADD target/dropwizard-example-1.1.0-SNAPSHOT.jar /target/dropwizard-example-1.1.0-SNAPSHOT.jar

ADD src/main/resources/assets /target/assets

ADD example.yml /target/example.yml

RUN ["java", "-jar", "/target/dropwizard-example-1.1.0-SNAPSHOT.jar", "db", "drop-all", "--confirm-delete-everything", "/target/example.yml"]

RUN ["java", "-jar", "/target/dropwizard-example-1.1.0-SNAPSHOT.jar", "db", "migrate", "/target/example.yml"]

USER 1001

CMD ["java", "-jar", "/target/dropwizard-example-1.1.0-SNAPSHOT.jar", "server", "/target/example.yml"]

EXPOSE 8080

# Building Docker Image
```
docker build -t comp110/web-scheduling ~/web-scheduling/
```

# Introduction

The Dropwizard example application was developed to, as its name implies, provide examples of some of the features
present in Dropwizard.

# Overview

Included with this application is an example of the optional DB API module. The examples provided illustrate a few of
the features available in [Hibernate](http://hibernate.org/), along with demonstrating how these are used from within
Dropwizard.

This database example is comprised of the following classes:

* The `PersonDAO` illustrates using the Data Access Object pattern with assisting of Hibernate.

* The `Person` illustrates mapping of Java classes to database tables with assisting of JPA annotations.

* All the JPQL statements for use in the `PersonDAO` are located in the `Person` class.

* `migrations.xml` illustrates the usage of `dropwizard-migrations` which can create your database prior to running
your application for the first time.

* The `PersonResource` and `PeopleResource` are the REST resource which use the PersonDAO to retrieve data from the database, note the injection
of the PersonDAO in their constructors.

As with all the modules the db example is wired up in the `initialize` function of the `HelloWorldApplication`.

# Running The Application

To test the example application run the following commands.

* To package the example run.

        mvn package

* To setup the h2 database run.

        java -jar target/dropwizard-example-1.0.1-SNAPSHOT.jar db migrate example.yml

* To run the server run.

        java -jar target/dropwizard-example-1.0.1-SNAPSHOT.jar server example.yml

* To hit the Hello World example (hit refresh a few times).

	http://localhost:8080/hello-world

* To post data into the application.

	
	curl -H "Content-Type: application/json" -X POST http://localhost:8080/people -d "{\"name\":\"Ervin Wu\",\"day\":\"Mon\",\"start\":5,\"end\":7,\"week_start_date\":\"9-26-2016\"}"


* how to delete/drop and add database.
	http://www.dropwizard.io/0.7.1/docs/manual/migrations.html
	open http://localhost:8080/people
# dockertest

# Deployment to UNC Cloudapps

* Go to https://console.ose.devapps.unc.edu and download the CLI Command Line Tools under the "?" icon.

* After the tools are installed.

---
	oc login
---
	oc new-project project-name
---
	oc new-app https://github.com/comp110/web-scheduling
---

* Once it finishes building and deploying, create a new route in the Overview page of the cloudapps web console and use the default settings.
** Note: This process can take awhile and may temporarily give you a 503 Error when visiting the created route. **

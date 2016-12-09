# Introduction

This is an application meant for the scheduling office hours for the COMP 110 LAs.  It utilizes the [Dropwizard](http://www.dropwizard.io/) web framework for the back-end and uses [React](https://facebook.github.io/react/) for the front-end.

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

# Software Requirements to Run

* Java 1.8
* Maven 3.3.9+
* npm 2.15.9+

# Running The Application

To test the application run the following commands.

* To package the application run.

        ./deploy

* To run the server.

        ./serve

* To see the program running locally go to the following url.

	http://localhost:8080

# Building Docker Image
```
docker build -t comp110/web-scheduling ~/web-scheduling/
```

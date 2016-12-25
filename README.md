@page mosaico Mosaico
@group mosaico.components Components
@group mosaico.clientModels Client Models
@group mosaico.services Services
@group mosaico.serviceModels Service Models

[![Build Status](https://travis-ci.org/direktspeed/mosaico.svg?branch=master)](https://travis-ci.org/direktspeed/mosaico)

Mosaico is a [DoneJS](https://donejs.com) app that enables users to coordinate
the players, teams, games, rounds and recordings of a basketball tournament.
It also serves as an example of how to use DoneJS with sessions, user
privileges, RESTful services, and ORM models.

If you want to run and build plain old mosaico we stayed compatible with it at present
- host /mosaico directly
- src /mosaico grunt build:old


If you want to run the new fresh with own backend.
- npm install && npm start
- optinal updates - src /mosaico grunt build our mosaico src automaticly updates /public/mosaico

------

To run the Mosaico app locally, run its tests, or generate its documentation
follow the steps outlined below.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Setup Environment](#setup-environment)
  - [Installing PostgreSQL on OSX](#installing-postgresql-on-osx)
  - [Installing PostgreSQL on Linux](#installing-postgresql-on-linux)
  - [Installing PostgreSQL on Windows](#installing-postgresql-on-windows)
- [Download Source](#download-source)
- [Install Dependencies](#install-dependencies)
- [Prepare the Database](#prepare-the-database)
- [Start the Server](#start-the-server)
- [Register a User](#register-a-user)
- [Enjoy](#enjoy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Setup Environment

Make sure you have installed:

- [Node 7](https://nodejs.org/en/download/)
- NPM 3 *(packaged with Node)*
- OPTIONAL -[PostgreSQL](https://www.postgresql.org/download/)

### Download Source

Clone this repo using git:

```
git clone https://github.com/direktspeed/mosaico.git
```

Navigate to the repository's directory

```
cd mosaico
```

### Prepare the Database SQLite
- npm install
- npm run db-migrate

### Prepare REMOTE the Database

Make sure the `postgres` process is running:

```
ps | grep postgres
```

You should see "postgres -D" among the output:

```
92831 ttys000    0:00.02 postgres -D /usr/local/var/postgres
92856 ttys000    0:00.00 grep postgres
```

With that confirmed we can create the database that the mosaico app
will persist its data to:

```
createdb mosaico
```

### Install Dependencies

To install the project's JavaScript dependencies run:

```
npm install
```

Additionally DoneJS's command line utilities need to be installed globally:
if you want to use donejs * commands

```
npm install -g donejs-cli
```

### Start the Server

With all the prerequisite setup completed the server can be started by running:

```
npm start
# Optional - donejs start
```

### Register a User

Navigate to [http://localhost:5000/register](http://localhost:5000/register)
in your browser and follow the instructions.

### Enjoy

You're finished! Explore some of the app's features:

- Live reload (`npm run develop`) OR (`donejs develop`)
- Run the tests (`npm test`) OR (`donejs test`)
- Generate the documentation (`npm run document`) OR (`donejs document`)

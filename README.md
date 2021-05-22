# Moviemaniac

Moviemaniac is a MEAN stack library based application where you can register/login and then add movies to your profile that you've seen. Your movie data will come in a tabular format. You can also edit your profile details which includes all the necesary Validations.
Apart from this, it's not doing much work as I developed this application to learn the authentication system of backend (based on Passport) and to improve my concepts on Material (Angular Material).

## Before You Begin
Before you begin I recommend you read about the basic building blocks that assemble a MEAN stack application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics.
* Angular - Angular's [Official Website](https://angular.io/docs/) is a great starting point. You can kickstart with the official [tour of heroes](https://angular.io/tutorial/) guide.
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Visual Studio Code - I recommend using [VSC](https://code.visualstudio.com/download) to code this application further, But you can use any other Code editor of your choice.
* Angular - Install [Angular](https://angular.io/cli), followed by [Material](https://material.angular.io/guide/getting-started)

```bash
$ npm install -g @angular/cli
```

```bash
$ ng add @angular/material
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, proceed to install the dependencies. Run this command in both frontend & backend application folder from the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* To update these packages later on, just run `npm update`

## Few Checks
* In some cases, you might need to globally install a separate 'nodemon' dependency by trying this command.
```bash
npm install -g nodemon
```
* Make sure to add your OMDB API in environment.ts file, to serve requests of this application.

## Running Your Application

### Run your Angular server using npm:

```bash
$ ng serve
```
Your frontend application should run on port 4200 with the environment configuration, so in your browser just go to [http://localhost:4200](http://localhost:4200)

### Run your Backend server using npm:

```bash
$ nodemon
```
Your backend application should run on port 3000.

---
THAT'S IT! YOUR APPLICATION SHOULD BE RUNNING NOW.

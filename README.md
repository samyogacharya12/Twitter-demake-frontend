Twitter Demake - Frontend
This repository contains the front end code for the Twitter Demake project, developed as part of CSC 532 - Advanced Topics in Software Engineering.

Project Overview
The Twitter Demake project is a simpified version of Twitter that focuses on core features such as user management and tweeting.

Current Status (Sprint 1 - October 10)
As of Sprint 1, the following backend features have been completed:

User Registration
User Login
Tweet Creation
Tweet Viewing
The project follows the Scrum methodology and will be updated progressively over future sprints.

Technology Stack
Front End Framework: Angular 18.2.6
Dependency Management:  Dependency Injection (DI) framework. 
Installation Instructions
You can verify the installation by running these commands in your terminal/command prompt:
node -v
npm -v

Angular CLI (Command Line Interface) is a tool to help you create and manage Angular projects.
Run the following command to install the Angular CLI globally on your machine:
npm install -g @angular/cli

Verify the installation by running:
ng --version

git clone https://github.com/samyogacharya12/Twitter-demake-frontend.git


Build and run the application:

docker-compose up
The FastAPI server will be accessible at http://localhost:8000 and the API documentation can be accessed at http://localhost:8000/docs.

Step 4: Manual Setup (Without Docker)
If you prefer not to use Docker, follow these steps:

Install the project dependencies using Poetry:

poetry install
Activate the virtual environment:

poetry shell
Run the FastAPI server using Uvicorn:

uvicorn src.main:app --reload
The application will be running at http://localhost:8000.

The project includes unit tests for key features such as user login and registration. To run the tests:

pytest -s
Course Information
This project is part of the CSC 532 - Advanced Topics in Software Engineering course at Louisiana Tech University (Ruston). The backend is being developed in multiple sprints using the Scrum methodology.



<<<<<<< HEAD
# Twitter Demake - Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
# Twitter Demake - Frontend
>>>>>>> 4e1be4fe31101ee96155b9b56757c24b7c144cac

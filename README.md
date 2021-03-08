# TodoList with Authentication 

_A todolist made with Express, Mongo and EJS as a school assignment_

Examples of functionality of the Todo List:

- Register new user
- Login to be able to see user todo
- Reset password possibility
- Unique todolist per user
- Save all todo models in the database
- Create, read, edit and delete from the todo list
- Pagination 
- Sort the list by date

---

## Installation
Use following command to install:

```
npm i

```
## Dependencies
- mongoose
- express
- ejs
- dotenv
- jsonwebtoken
- cookie-parser
- bcrypt
- nodemailer 
- nodemailer-sendgrid-transport
- @sendgrid/mail

## How to run
- Clone the repo and install all neccessary dependencies
- Run `npm start`

## Usage .env
Create a .env file in the root directory of your project. Then add environment-specific variables on new lines in the form of `NAME=VALUE`. Replace {value} with your own data. For example:

```
DB_CONNECT= {value}
PORT= {value}
SECRET_KEY= {value}
USER_EMAIL= {value}
SENDGRID_API_KEY= {value}

```
**This app use the database MongoDB, to be able to setup your own database, please go to MongoDB Atlas to create an account.**

## Naming conventions

### Variables

- Use let instead of var
- When naming variables use **camelCase**

* Eg `let newTodotask = new Todotask(task);`

### Functions

- Function names should use _camelCase_

### Classes

- Class names should use **PascalCase**
* Eg `class Todo`

## Project structure

```
Project root
├── controller
├── └── business logic/js-files
├── middleware
├── └── authentication logic/js-files
├── models
├── └── database models/js-files
├── public/css
├── └── css styling
├── routes
├── └── routing-related logic/js-files
├── views
├── └── HTML/ejs-files
├── node_modules
│   └── modules
```

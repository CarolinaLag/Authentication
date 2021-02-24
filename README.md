# TodoList with Authentication 

_A todolist made with Express, Mongo and EJS as a school assignment_

Examples of functionality of the Todo List:

- Register new user
- Login to be able to see users todo
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
## How to run
- Clone the repo and install all neccessary dependencies
- Run `npm start`

**Note that the URI of the database and localhost port is in a hidden .env file that is not included in this repository, and you will therefore need your own MongoDB Atlas account to use this TodoApp.**

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
├── └── Routing-related logic/js-files
├── views
├── └── HTML/ejs-files
├── node_modules
│   └── modules
```

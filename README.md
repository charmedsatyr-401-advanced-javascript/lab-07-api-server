![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 07: API Server

### Author: Joseph Wolfe

### Links and Resources
* [PR](https://github.com/charmedsatyr-401-advanced-javascript/lab-07-api-server/pull/1)

* [![Build Status](https://travis-ci.org/charmedsatyr-401-advanced-javascript/lab-07-api-server.svg?branch=submission)](https://travis-ci.org/charmedsatyr-401-advanced-javascript/lab-07-api-server)

#### Documentation
* [Swagger](./docs/swagger.json)

### Modules
`index.js`

`./lib/server.js`

`./lib/db.js`

`./lib/logger.js`

`./lib/validate.js`

`./lib/routes.js`


##### Exported Values and Methods from `index.js`
N/A

##### Exported Values and Methods from `server.js`
###### `app` -> an instance of the Express application
###### `start(PORT)` -> a function to start the application

##### Exported Values and Methods from `db.js`
###### `db` -> a a simple empty array database

##### Exported Values and Methods from `logger.js`
###### `logger(req, res, next)` -> logs `LOG: req.method, req.path`

##### Exported Values and Methods from `validate.js`
###### `validate(input)` -> a valid database object or `false`

##### Exported Values and Methods from `routes.js`
###### `getAllCategories(req, res, next)` -> retrieves all categories from database
###### `getCategory(req, res, next)` -> retrieves a single category by ID
###### `postCategory(req, res, next)` -> adds category to database
This route writes to the database and returns the new object if the insertion is validated with `validate`; otherwise it returns an empty object.

###### `putCategory(req, res, next)` -> modifies category in database
This route modifies an object in the database and returns the new object if the insertion is validated with `validate`; otherwise it returns an empty object.

###### `deleteCategory(req, res, next)` -> removes category from database

#### Running the app
* `node index.js` or `nodemon index.js`
The application will run by default at `http://localhost:8080/`.

#### Tests
* How do you run tests?

`npm run tests`

`npm run test-watch`
* What assertions were made?

  * It should respond with a 404 on an invalid route.

  * It should respond with a 404 on an invalid method.

  * It should respond properly on request to /categories.

* What assertions need to be / should be made?

Testing for this application is incomplete. The data model, `validate` package, `logger`, and each route handler require unit testing. There should also be a test for the response to a server error.

#### UML
N/A

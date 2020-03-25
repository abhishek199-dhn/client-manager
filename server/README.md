Client Manager API
===============================

Client Manager API is a graphql server which is a query language for API's to communicate.

Why GraphQL.?
---
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.


Libraries
---------

* [GraphQL](https://graphql.org/)  
* [Apollo server & tools](https://www.apollographql.com/docs/apollo-server/)
* [Express](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Winston](https://github.com/winstonjs/winston) Logging
* [Babel](https://babeljs.io/) ES6/ES7 to ES5 compiler
* [Eslint](https://eslint.org/) for syntax check
* [Jest](https://flow.org/en) and Enzyme for Unit testing
* [JWT]() for Authorization
* [Mongoose](https://mongoosejs.com/) MongoDb node client

Structure
---------

* **resolvers**     : 
  - Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, or subscription) into data. 
    They either return the same type of data we specify in our schema or a promise for that data. 
  - It contains resolvers for each type in different directories.
    
* **Schema**      :
  - Contains graphql queries, mutations and subscriptions schemas.
  
* **models**      :
  - Contains mongodb models that defines structure of collections
    
* **types**         :
  - TypeScript type definitions
  
* **Utils**          : 
  - Utility classes. 

* **app.ts**        :
  - Server entry point and contains server init code.
               

Installation
----

#### Prerequisite

* You need to have [Node.js](https://nodejs.org/en/download/) (> 8) installed.
* [Yarn](https://yarnpkg.com/lang/en/docs/install/) for dependency management.
* MongoDB server running on default port 
Usage
-----

#### How to run? ###
```shell script
Steps:
$ cd server # directory containing package.json
$ yarn install # if not done
$ yarn test-data # adds dummy data to mongo
$ yarn start # starts development server or
$ yarn start-prod # starts production server
```

This will start a server (using webpack).

Once you've started the server, navigate to http://localhost:3005/
to get started and play with playground!

#### How to run test suit? ###
```sh
Steps:
 $ cd server # directory containing package.json
 $ yarn install # if not done
 $ yarn test
```

It should print something like this:-
 
```
Test Suites: 3 passed, 3 total 
Tests:       4 passed, 4 total 
Snapshots:   0 total
Time:        1.783s
Ran all test suites.
```
#### Documentation

Once you've started the server, navigate to http://localhost:3005/
to view the api documentation and play with playground!

 1. Un authorized operations
    - login - query operation returns token
    
 2. Authorized operations : 
    - users - query operation
    - clients - query operation
    - clientTransactions - query operation
    - addUser - mutation operation
    - addClient - mutation operation
    - addClientTransaction - mutation operation
    - updateClientTransaction - mutation operation
    ```
     Requires authorization header in http headers
     {
        "authorization": "Bearer xxx.xxx.xxx"
     }
    ```
    

#### Sample queries and mutations (try it on playground)

```graphql
# to fetch all clientTransactions
{
  clientTransactions {
    _id
    itemsPurchased
    merchant
    clientId
    amount
    createdAt
    updatedAt
  }
}
```   
```graphql
# to fetch clientTransactions with page size of 2
{
  clientTransactions (filters:{
  limit: 2
    skip: 0
  }){
    _id
    itemsPurchased
    merchant
    clientId
    amount
  }
}
```

```graphql
# to fetch all client contacts
{
  clients {
    _id
    name
    title
    companyName
    address
    createdAt(format:"DD-MM-YYYY")
    #createdAt
    updatedAt
  }
}  
``` 


```graphql
# Post a client
mutation {
  addClient(
    client: {
      name: "Abhishek"
      title: "SDE"
      companyName: "Awesome"
      address: "Pune"
      industry: "ALL"
    }
  ) {
    _id
    name
    title
    companyName
    address
    industry
    createdAt
    updatedAt
  }
}
``` 

```graphql
# To get user token
mutation {
  login(auth: { username: "abhishek", password: "kumar" }) {
    token
  }
}
``` 
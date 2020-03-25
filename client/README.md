Client Manager UI
===============================

The base architecture of the application is Component based Architecture and designed as SPA(Single page applications) in react.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Why React.?
---
* The component-based approach, well-defined lifecycle, and
use of just plain JavaScript make React very simple to learn, build a professional web (and mobile applications), and support it.
* React uses a special syntax called JSX, which allows you to mix HTML with JavaScript.
* React creates its own virtual DOM where your components actually live. This approach gives you enormous flexibility and amazing gains in performance because React calculates what changes need to be made in the DOM beforehand and updates the DOM tree accordingly. This way, React avoids costly DOM operations and makes updates in a very efficient manner.
* React is open source and developed and maintained by Facebook and used in their internal projects. 


Libraries
---------

* [React](https://reactjs.org/) 16 
* [React-router](https://reacttraining.com/react-router/web/guides/philosophy) v4
* [TypeScript](https://www.typescriptlang.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Material-UI](https://material-ui.com/)
* [Scss-module](https://medium.com/@marcmintel/how-to-use-the-module-pattern-in-your-scss-sass-stylesheets-89fe38a6e1f3)
* [Webpack](https://webpack.js.org) 4
* [Babel](https://babeljs.io/) ES6/ES7 to ES5 compiler
* [Eslint](https://eslint.org/) for syntax check
* [Jest](https://flow.org/en) and Enzyme for Unit testing
* [Yarn](https://yarnpkg.com/en/) dependency manager

Design
---------

* **Components**     :
   - Contains React presentational components which are concerned with how things look and contains only the view part.
   - Have no dependencies on the rest of the app, such as Redux actions or stores 
   - Does not specify how the data is loaded or mutated.
   - We are using `react-virtualized` lib to optimize our data grid. 
     Virtualization is a technique where the dom are rendered which are visible in the view port. Hence enhances the browser rending performance. 
             
* **Containers**     : 
  - Contains Container components which are concerned with how things work. 
  - Provide the data and behavior to presentational or other container components.
  - Usually generated using higher order components such as connect() from React Redux.
  - Responsible to fetch data from api (using graphql client)and pass the result to its children using render props.
    
    
* **Shared**       :
  - Contains Reusable components which can be used across the applications.
   
* **Schema**      :
  - Contains graphql queries, mutations and subscriptions used by apollo client to fetch data.
  
* **types**         :
  - TypeScript type definitions
  
* **Utils**          : 
  - Utility classes. 
  
* **styles**          : 
  - Contains all the global css/scss files and should be imported in index.ts files.
  
* **index.ts**        :
  - Application entry point.
               
###### Note

* Each components/containers/reusable components has its own test file inside the same folder. 
  (Example/Header.test.js)

Installation
----


#### Prerequisite

* You need to have [Node.js](https://nodejs.org/en/download/) (> 6) installed.  
* [Yarn](https://yarnpkg.com/lang/en/docs/install/) for dependency management.

#### Post Installation

If you would like to have debug capabilities, you can download these Chrome extensions
* [React DevTool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Apollo DevTool](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

Available Scripts
----

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


Usage
-----

#### How to run? ###
```sh
Steps:
$ cd client # directory containing package.json
$ yarn install # if not done
$ yarn build #dev build 
$ yarn start # starts development server
```

This will start a server (using webpack).

Once you've started the server, navigate to http://localhost:3000/
to get started and view in action!

#### How to run test suit? ###
```sh
Steps:
 $ cd client # directory containing package.json
 $ yarn install # if not done
 $ yarn build # if not done
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

Configuration
----
The application can consume variables declared in your environment as if they were declared locally in your JS files. 
By default you will have NODE_ENV defined for you, and any other environment variables starting with REACT_APP_.

WARNING: Do not store any secrets (such as private API keys) in your React app!

Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.
[Read More](https://create-react-app.dev/docs/adding-custom-environment-variables)


Production Optimization and Bundle Analysis
---

The build runs through various optimizers and bundling pipelines which results and bundles the code different chunks

```shell script
yarn run analyze
```
#### Code Splitting

The Architecture supports hybrid bundling model i.e 
- Components can be bundle in a file and loaded at the initial page load.
  This may increases the rendering time to render the page as the bundle may contain components which are
  not required for a particular routes.
  
- Components are bundled together according to the parent routes. Each parent routes contain its own bundle chunk.
  These components are loaded on demand. ie in a Asynchronously way.
  This decreases the load time and bundle size for initial rendering.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

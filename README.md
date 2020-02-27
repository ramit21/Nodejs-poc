# Nodejs-poc
POC for setting up nodejs server

Steps to run this POC:

1)Install nodejs from: https://nodejs.org/en/

2)Git clone this repo and run 'npm install' (this creates the node_modules folder)

3)Start the server by running: 'node app.js'

4)Test the server by hitting http://localhost:3000/ in your browser

5)Test sending paramters in GET request (someText1 and someText2) using the url:
http://localhost:3000/testGet/someText1?value=someText2

6)Test post request by hitting http://localhost:3000/testPost from a Rest client. 
(To parse the request body in case of POST a request, 'bodyParser' needs to be installed: 'npm install --save body-parser')
JSON data for request from postman:
```
{
	"title": "abc",
	"content": "xyz"
}
```
Try removing content from above, or give empty title and see the validations fail.

7)To call the Rest api from the server, hit the url localhost:3000/testRest/3000

8)To check the error handling for rest api, call the same url with wrong port no localhost:3000/testRest/9999

9)To test the pug templating framework, hit the url: localhost:3000/pug. Steps for pug setup:

  npm install pug --save

  app.set('view engine', 'pug') to set the templating agent

  Create a Pug template file named index.pug in the views directory

  Then create a route to render the pug file: res.render('index', { title: 'Hey', message: 'Hello there!' })

  For more details on templating, please refer: https://expressjs.com/en/guide/using-template-engines.html

10) Unit Testing: Setup Mocha/Chai:

  npm install mocha --save    //Nodejs testing framework

  npm install chai --save     //Assertion framework

  npm install request --save  //For integration testing, we would need a way to send http requests, so install this request module

  In package.json add following:

  "scripts": {

    "test": "./node_modules/.bin/mocha --reporter spec"

  }

  Finally create the test spec. See converter.*.spec.js files on how we import chai, request (in integration test case) and the actual module to be tested (in unit test case). The first module of test case is unit test.

  Run **npm test** -> and see that only unit test cases pass, not the integration test case.
  
  Now start the server -> node app.js, and then again run -> npm test to see all test cases pass.

  Also see converter.api.spec.js on how to test asynchronous code. This is achieved using the 'done' parameter. Testing framework will execute the expect only when the done() is called in the test case.

  In case you need to mock a library, then place a mock in the __mock__ directory adjacent to the node_modules directory.

## Theory

Nodejs is an event driven, single threaded web server written in javascript.
Express js is a light-weight web application framework to help organize your web application into an MVC architecture on the server side.

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

Nodejs runs on top of V8 engine, which reads the javascript code, and calls the underlying C++ functions. Google chrome also uses V8 engine for similar use. Also note that just like we have a window variable on browsers to hold global variables, nodejs has a variable named 'global' for the same purpose.

To learn how to setup a nodejs application from scratch, follow this url:
http://expressjs.com/en/starter/installing.html

To compare nodejs with Java for server programming, follow this url:
http://www.infoworld.com/article/2883328/java/java-vs-nodejs-an-epic-battle-for-developer-mindshare.html

Q. Where exactly to use nodejs?
Ans. To build a lightweight, high traffic, data-intensive (but low processing/computation) application that runs across distributed devices.

For more details, refer https://medium.com/the-node-js-collection/why-the-hell-would-you-use-node-js-4b053b94ab8e
https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

----------------------------------------------------------
You can refer nodejs.org for to check how to use various modules provided by nodejs. Eg. https://nodejs.org/dist/latest-v12.x/docs/api/console.html 

You can search for npm packages on https://www.npmjs.com/package/package.

npm install --save to update package.json, and npm install -g doesn't update package json, it updates the node installed on the system.

You can use nodemon package for devtools, ie keep the command line up and running, even after your node file has finished executing. If you make any changes to the code, nodemon will automatically re run the node command. Instead of running node file, you run it via nodemon, ie > nodemon file. Nodemon is installed with -g flag so that all node applications can be run against it. Also, see the "dev" script as configured in the package.json. You can then use below to run with nodemon in dev:
```
npm run dev
```

You can use the chalk module for printing colourful console.log statements on the terminal.

Command line arguments can be passed when running the node command, and can be accessed in the code via process.argv variable. You can also include and use the yargs module for more fine grain handling of run time arguments such as calling handler functions on different arguments, or pass arguments with values like --title='abc' etc.

**Debugging**: console.log is the obvious choice. But you can also use inspect. Start the the app as:
```
node inspect app.js
```
Next, visit 'chrome://inspect' in the Chrome browser. There, you’ll see a list of all the Node.js processes that you’re able to debug. Click “inspect” next to your Node.js process to open up the developer tools. From there, you can click the blue “play” button near the top-right of the “sources” tab to start up the application. You can also add 'debugger' in the source code in the browser.

Mongoose is a library used to declare object schema and add validations to the model. Works really well when persisitng data models in the mongo db. Easily integrates validations on respective fields of the model. 

**Security**:

You can use bcrypt library to encrypt the data.

You can jsonwebtoken library to create or verify JWT tokens:
```
const jwt = require('jsonwebtoken');
jwt.sign({ user details }, 'myPassword');
```
When creating the token, you can also pass in an optional expiry paramter after which the token expires.

You must save the tokens in the backend for different user login sessions (eg. web, mobile, tablet etc), so that if the user logs out of one device, he doesn't get logged out from other devices.

On subsequent calls, you can verify the token like this:
```
const decoded = jwt.verify(token, 'myPassword');
const userId = decoded._id;
```
You can also get user name from the validted token. This verification can be added to generic app.use() middleware as shown in app.js, or we can have request level middlewares by adding them to specific route handlers. (see auth function and its use in app.js)


**Q. Is nodejs really single-threaded?**

**Ans.** nodejs has 2 threads:

1. **Event-loop** -> Single threaded. nodejs maintains a queue where tasks are added, and the even loop polls this queue for the next task to perform. For eg. a settimeout will be available in the queue after its given timeout period, and then it will be picked up by event loop and processed further. Event loop offloads all heavy lifting tasks to worker threads. Same is the story for IO/CPU intensive tasks.

2. **Worker-threads** -> multi-threaded. The underlying C++ libuv library mantains a thread pool for processing heavy duty operations.

Read this for more info:

https://nodejs.org/uk/docs/guides/dont-block-the-event-loop/



# Nodejs-poc
POC for setting up nodejs server 

Nodejs is an event driven, single threaded web server written in javascript.
Express js is a light-weight web application framework to help organize your web application into an MVC architecture on the server side.

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

To learn how to setup a nodejs application from scratch, follow this url:
http://expressjs.com/en/starter/installing.html

To compare nodejs with Java for server programming, follow this url:
http://www.infoworld.com/article/2883328/java/java-vs-nodejs-an-epic-battle-for-developer-mindshare.html


Steps to run this POC:

1)Install nodejs from: https://nodejs.org/en/

2)Git clone this repo and run 'npm install' (this creates the node_modules folder)

3)Start the server by running: 'node app.js'

4)Test the server by hitting http://localhost:3000/ in your browser

5)Test sending paramters in GET request (someText1 and someText2) using the url:
http://localhost:3000/testGet/someText1?value=someText2

6)Test post request by hitting http://localhost:3000/testPost from a Rest client. 
To parse the request body in case of POST a request, 'bodyParser' needs to be installed: 'npm install --save body-parser'.
From the client side, ensure to send some valid Json as POST request body, and to set Content-Type in the header to application/json.

7)To call the Rest api from the server, hit the url localhost:3000/testRest/3000

8)To check the error handling for rest api, call the same url with wrong port no localhost:3000/testRest/9999

9)To test the pug templating framework, hit the url: localhost:3000/pug. Steps for pug setup:

  npm install pug --save

  app.set('view engine', 'pug') to set the templating agent

  Create a Pug template file named index.pug in the views directory

  Then create a route to render the pug file: res.render('index', { title: 'Hey', message: 'Hello there!' })

  For more details on templating, please refer: https://expressjs.com/en/guide/using-template-engines.html

10) To Setup Mocha/Chai based unit testing:
  npm install mocha --save    //Nodejs testing framework
  npm install chai --save     //Assertion framework
  npm install request --save  //For integration testing, we would need a way to send http requests, so install this request module
  In package.json add following:
  "scripts": {
    "test": "./node_modules/.bin/mocha --reporter spec"
  }
  Finally create the test spec. See converter.*.spec.js files on how we import chai, request (in integration test case) and the actual module to be tested (in unit test case). The first module of test case is unit test.
  Run npm test -> and see that only unit test cases pass.
  Now start the server -> node app.js, and then again run -> npm test to see all test cases pass.


Q. Where exactly to use nodejs?
Ans. To build a lightweight, high traffic, data-intensive (but low processing/computation) application that runs across distributed devices.

For more details, refer https://medium.com/the-node-js-collection/why-the-hell-would-you-use-node-js-4b053b94ab8e
https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha


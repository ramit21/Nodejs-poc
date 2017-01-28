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

2)Git clone this repo and run 'npm install'

3)Start the server by running: 'node app.js'

4)Test the server by hitting http://localhost:3000/ in your browser

5)Test sending paramters in GET request (someText1 and someText2) using the url:
http://localhost:3000/testGet/someText1?value=someText2

6)Test post request by hitting http://localhost:3000/testPost from a Rest client. 
To parse the request body in case of POST a request, 'bodyParser' needs to be installed: 'npm install --save body-parser'.
From the client side, ensure to send some valid Json as POST request body, and to set Content-Type in the header to application/json.

7)To call the Rest api from the server, hit the url localhost:3000/testRest/3000

8)To check the error handling for rest api, call the same url with wrong port no localhost:3000/testRest/9999


const express = require('express');
const app = express();
const bodyParser =  require("body-parser");
const chalk = require('chalk');
const Post = require('./model/post');
const colorRouter = require('./routers/colorRouter');

console.log(chalk.blue(__dirname, __filename));

const path = require('path'); //default modules provided by nodejs need not be installed
const viewPath = path.join(__dirname, '/views');
const restService = require("./service/restService.js");


//Here we are configuring express to use body-parser as middle-ware for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(colorRouter); //seperate routes into separate files like this

//Middleware to capture each request, can be used for auth or request level filtering.
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next(); //if next is not called, the request handlers will not get executed.
})

const auth = async (req, res, next) => { //note the async in auth middleware
	console.log("auth middlweare");
	/*
	const decoded = jwt.verify(token, 'myPassword');
	const userName = decoded.name;
	*/
	const userName = "ramit";
	req.userName = userName;
	next();
}

app.set('views', viewPath) //path to html directory
app.set('view engine', 'pug')

app.listen(3000, function () {
  	console.log('Example app listening on port 3000!');
});

app.get('/',  (req, res) => {
  	res.send('Welcome to nodejs server!');
});

app.get('/pug', (req, res) => {
  	res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/testGet/:text', auth, function (req, res) { //auth middleware used here
	const responseMsg = {
		pathVariable : req.params.text,
		requestVariable: req.query.value
	};
	console.log("req.userName: ", req.userName);
	console.log("Get request response: ", responseMsg);
  	res.send(responseMsg);
});

app.get('/testRest/:port', (req, res) => {
	//Callback function to handle Rest api call response
	const callback = function(data){
		res.send(data);
	}
	//Call rest service with hardcoded values(basically hitting local server itself for the purpse of testing)
	restService.performRequest('localhost',req.params.port,'/testGet/someVal1','GET','value=someVal2',callback);
});

app.post('/testPost', (req, res) => {
	//console.log("Post request body:", req.body);
	const post = new Post(req.body);
	console.log("saving post = ",post);
	post.save().then(() => { //this would save object to db connected via mongoose.connect()
		console.log("Saved...");
		res.send(post);
	}).catch((error) => {
		console.log("Error...", post);
		res.status(400).send(error);    //See how to set error codes in response
	});	
});

  //default match should be kept in the last
  app.get("*", (req, res) => {
	console.log(chalk.red('404 error.'));
	res.status(404).send('My 404 Not found');
  });
  
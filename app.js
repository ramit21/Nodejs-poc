const express = require('express');
const app = express();
const bodyParser =  require("body-parser");
const chalk = require('chalk');
const colorRouter = require('./routers/colorRouter');

console.log(chalk.blue(__dirname, __filename));

const path = require('path'); //default modules provided by nodejs need not be installed
const viewPath = path.join(__dirname, '/views');

const restService = require("./service/restService.js");

//Here we are configuring express to use body-parser as middle-ware for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(colorRouter); //seperate routes into separate files like this

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

app.get('/testGet/:text', function (req, res) {
	const responseMsg = {
		pathconstiable : req.params.text,
		requestconstiable: req.query.value
	};
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
	console.log("body",req.body);
	const data = req.body;
	data.processed=true;
  	res.send(data);
});

  //default match should be kept in the last
  app.get("*", (req, res) => {
	console.log(chalk.red('404 error.'));
	res.send('My 404 Not found');
  });
  
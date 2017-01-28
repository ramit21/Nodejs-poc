var express = require('express');
var app = express();
var bodyParser     =        require("body-parser");

var restService = require("./service/restService.js");

//Here we are configuring express to use body-parser as middle-ware for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function () {
  	console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  	res.send('Welcome to nodejs server!');
});

app.get('/testGet/:text', function (req, res) {
	var responseMsg = {
		pathVariable : req.params.text,
		requestVariable: req.query.value
	};
	console.log("Get request response: ", responseMsg);
  	res.send(responseMsg);
});

app.get('/testRest/:port', function (req, res) {
	//Callback function to handle Rest api call response
	var callback = function(data){
		res.send(data);
	}
	//Call rest service with hardcoded values(basically hitting local server itself for the purpse of testing)
	restService.performRequest('localhost',req.params.port,'/testGet/someVal1','GET','value=someVal2',callback);
});

app.post('/testPost', function (req, res) {
	console.log("body",req.body);
	var data = req.body;
	data.processed=true;
  	res.send(data);
});

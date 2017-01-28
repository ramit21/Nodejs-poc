var http = require('http');

var performRequest = function(host, port, endpoint, method, data, callback){
	var dataString = JSON.stringify(data)
	var header = {
		'Content-Type':'application.JSON',
		'Content-Length': data.length
	};

	if(method='GET') {
		if(data){
			endpoint += '?' + data
		}
	}

	var options = {
		host: host,
		port:port,
		path:endpoint,
		header:header,
		method:method
	};

	var req = http.request(options, function(res){
		var responseString = '';

		res.on('data', function(data){
			responseString += data;
		});

		res.on('end', function(){
			callback(responseString);
		}).on('error', function(){
			callback('Error response from the api');
		});
	});

	req.on('error', function(err){
		callback('Error occured while calling api: ' + err);
	});

	req.write(dataString);
	req.end();
}

//module.exports is the object that's actually returned as the result of a require call
//So exposing the methods from this file to require calls to be used in app.js server file:
module.exports.performRequest=performRequest;

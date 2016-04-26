var express = require('express'),
	bodyParser = require('body-parser');

var server = express();
server.post('/image', bodyParser.urlencoded({extended: true, limit: '1mb'}), require('./'));

server.listen(3001, function () {
	console.log('Started');
});
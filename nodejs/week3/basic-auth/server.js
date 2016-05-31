var express = require('express');
var morgan = require('morgan');

var app = express();

function auth(req, res, next) {
	console.log(req.headers);
	var authHeader = req.headers.authorization;

	if (!authHeader) {
		var err = new Error('You are not authenticated!');
		err.status = 401;
		next(err);
		return;
	}

	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(":");
	var user = auth[0];
	var pass = auth[1];

	if (user == 'admin' && pass == 'admin') {
		next();
	}
	else {
		var err = new Error('You are not authenticated!');
		err.status = 401;
		next(err);
	}
}
app.use(auth);

app.use(function(err, req, res, next) {
	res.writeHead(err.status || 500, 
		{'WWW-Authenticate': 'Basic', 'Content-Type': 'text/plain'});
	res.end(err.message);
});

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));

var hostname = '107.102.182.149', port = 3000;
app.listen(port, hostname, function() {
	console.log(`Server running at http://${hostname}:${port}/`);
});
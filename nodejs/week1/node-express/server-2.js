var express = require('express');
var morgan = require('morgan');

var hostname = '107.102.182.149', port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.listen(port, hostname, function() {
	console.log(`Server running at http://${hostname}:${port}/`);
});
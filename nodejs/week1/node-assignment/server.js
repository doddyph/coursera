var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = '107.102.182.149', port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

var dishRouter = require('./dishRouter');
app.use('/dishes', dishRouter);

var promoRouter = require('./promoRouter');
app.use('/promotions', promoRouter);

var leaderRouter = require('./leaderRouter');
app.use('/leadership', leaderRouter);

app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function() {
	console.log(`Server running at http://${hostname}:${port}/`);
});
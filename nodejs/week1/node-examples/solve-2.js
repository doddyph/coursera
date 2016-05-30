var rect = require('./rectangle-2');

function solveRect(l, b) {
	console.log('Solving for rectangle with l: '+l+', b: '+b);

	rect(l, b, function(err, rectangle) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('The area of a rectangle is '+rectangle.area());
			console.log('The perimeter of a rectangle is '+rectangle.perimeter());
		}
	});
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, -5);
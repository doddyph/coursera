var rect = {
	perimeter: function(x, y) {
		return (2 * (x + y));
	},
	area: function(x, y) {
		return (x * y);
	}
};

function solveRect(l, b) {
	console.log('Solving for rectangle with l: '+l+', b: '+b);

	if (l < 0 || b < 0) {
		console.log('Rectangle dimension should be greater than zero.');
	}
	else {
		console.log('The area of a rectangle is '+rect.area(l, b));
		console.log('The perimeter of a rectangle is '+rect.perimeter(l, b));
	}
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, -5);
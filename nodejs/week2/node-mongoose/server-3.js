var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-3');

var url = 'mongodb://107.102.182.149:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to MongoDB server.');

	Dishes.create({
		name: 'uthapizza',
		description: 'test',
		comments: [
			{
				rating: 3,
				comment: 'This is insane',
				author: 'Matt Daemon'
			}
		]
	}, function(err, dish) {
		if (err) throw err;
		console.log('Dish created!');
		console.log(dish);

		var id = dish._id;

		setTimeout(function() {
			Dishes.findByIdAndUpdate(id, 
				{$set: {description: 'updated test'}},
				{new: true})
			.exec(function(err, dish) {
				console.log('Updated Dish!');
		        console.log(dish);

		        dish.comments.push({
		        	rating: 5,
		        	comment: 'I\'m getting a sinking feeling!',
		        	author: 'Leonardo di Carpaccio'
		        });

		        dish.save(function(err, dish) {
		        	console.log('Updated comments!');
		        	console.log(dish);

		        	db.collection('dishes').drop(function() {
						db.close();
					});
		        });
			});
		}, 3000);
	});
});
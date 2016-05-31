var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes');
//var Promotions = require('./models/promotions');
//var Leadership = require('./models/leadership');

var url = 'mongodb://107.102.182.149:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to MongoDB server.');

	Dishes.create({
		name: 'uthapizza',
		image: 'images/uthapizza.png',
      	category: 'mains',
      	label: 'Hot',
      	price: '4.99',
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
				{$set: {description: 'A unique...'}},
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

	/*Promotions.create({
		name: 'Weekend Grand Buffet',
		image: 'images/buffet.png',
      	label: 'New',
      	price: '19.99',
		description: 'Featuring...'
	}, function(err, promotion) {
		if (err) throw err;
		console.log('Promotion created!');
		console.log(promotion);

		var id = promotion._id;

		setTimeout(function() {
			Promotions.findByIdAndUpdate(id, 
				{$set: {description: 'A unique...'}},
				{new: true})
			.exec(function(err, promotion) {
				console.log('Updated Promotion!');
		        console.log(promotion);

		        db.collection('promotions').drop(function() {
					db.close();
				});
			});
		}, 3000);
	});*/

	/*Leadership.create({
		name: 'Peter Pan',
		image: 'images/alberto.png',
      	designation: 'Chief Epicurios Officer',
      	abbr: 'CEO',
		description: 'Our CEO, Peter,...'
	}, function(err, leader) {
		if (err) throw err;
		console.log('Leadership created!');
		console.log(leader);

		var id = leader._id;

		setTimeout(function() {
			Leadership.findByIdAndUpdate(id, 
				{$set: {description: 'A unique...'}},
				{new: true})
			.exec(function(err, leader) {
				console.log('Updated Leadership!');
		        console.log(leader);

		        db.collection('leaderships').drop(function() {
					db.close();
				});
			});
		}, 3000);
	});*/
});

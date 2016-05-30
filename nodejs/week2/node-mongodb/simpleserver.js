var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://107.102.182.149:27017/conFusion';

MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log('Connected to MongoDB server.');

	var collection = db.collection("dishes");
	collection.insertOne({name: "Uthapizza", description: "test"}, function(err, result) {
		assert.equal(err, null);
		console.log('After insert:');
		console.log(result.ops);

		collection.find({}).toArray(function(err, docs) {
			assert.equal(err, null);
			console.log('Found:');
			console.log(docs);

			db.dropCollection("dishes", function(err, result) {
				assert.equal(err, null);
				console.log('Closing DB...');
				db.close();
			});
		});
	});
});
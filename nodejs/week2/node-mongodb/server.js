var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var dbOper = require('./operations');

var url = 'mongodb://107.102.182.149:27017/conFusion';

MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log('Connected to MongoDB server.');

	dbOper.insertDocument(db, {name: "vadonut", description: "test"}, "dishes", function(result) {
		console.log('insertDocument >> ', result.ops);

		dbOper.findDocuments(db, "dishes", function(docs) {
			console.log('findDocuments >> ', docs);

			dbOper.updateDocument(db, {name: "vadonut"}, {description: "updated test"}, "dishes", function(result) {
				console.log('updateDocument >> ', result.result);

				dbOper.findDocuments(db, "dishes", function(docs) {
					console.log('findDocuments >> ', docs);

					db.dropCollection("dishes", function(result) {
						console.log('dropCollection >> ', result);
						db.close();
					});
				});
			});
		});
	});
});
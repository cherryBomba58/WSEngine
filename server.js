var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/project';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	
	// I called insertDocuments only first time
	findDocuments(db, function() {
		db.close();
	});
});

var insertDocuments = function(db, callback) {
	var collection = db.collection('webshops');
	collection.insertMany([
		{name:'Webshop1', url:'#', webshopID:1},
		{name:'Webshop2', url:'#', webshopID:2},
		{name:'Webshop3', url:'#', webshopID:3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the collection");
		callback(result);
	});
}

var findDocuments = function(db, callback) {
	var collection = db.collection('webshops');
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records:");
		console.log(docs);
		callback(docs);
	});
}
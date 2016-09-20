var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/project';
var database = '';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	database = db;
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:'true'}));
app.use(bodyParser.json());

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

app.get('/api/webshops', function(req, res) {
	var collection = database.collection('webshops');
	collection.find({}).toArray(function(err, docs) {
		if(err) res.send(err);
		console.log("Found the following records:");
		console.log(docs);
		res.json(docs);
	});
});

app.listen(3000);
console.log("App listening on port 3000");
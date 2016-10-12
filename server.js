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


app.get('/api/webshops', function(req, res) {
	var collection = database.collection('webshops');
	collection.find({}).toArray(function(err, docs) {
		if(err) res.send(err);
		console.log("Found the following records:");
		console.log(docs);
		res.json(docs);
	});
});

app.get('/api/products', function(req, res) {
	var collection = database.collection('products');
	collection.find({}).toArray(function(err, docs) {
		if(err) res.send(err);
		//console.log("Found the following records:");
		//console.log(docs);
		res.json(docs);
	});
});

app.post('/api/webshops', function(req, res) {
	var collection = database.collection('webshops');
	console.log("req.body:");
	console.log(req.body);
	collection.insert({name:req.body.name, webshopID:req.body.webshopID},
	  function(err, result) {
		assert.equal(err, null);
		//assert.equal(1, result.result.n);
		//assert.equal(1, result.ops.length);
		console.log("Inserted a document into the webshops collection");
	});
});

app.post('/api/products', function(req, res) {
	var collection = database.collection('products');
	collection.insertMany([
		{name:'Cuki kiscica', quantityCenter: 3, price: 500, productID: 1, bday: '2016.07.01.'},
		{name:'Toyota Yaris', quantityCenter: 3, price: 5000000, productID: 2, consume: 10, mark: 'Toyota', type: 'Yaris'},
		{name:'ASUS X555L', quantityCenter: 3, price: 170000, productID: 3, processorGHz: 2.2, processorCoresNum: 2},
		{name:'Volvo 740', quantityCenter: 5, price: 10000000, productID: 4, consume: '20', mark: 'Volvo', type: '740'},
		{juju:'kulipintyo', farsang:'janoska', eckecpec:'jujjjj!', marslako:4, venuszlako:'5', ordog:666}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(5, result.result.n);
		assert.equal(5, result.ops.length);
		console.log("Inserted 5 documents into the products collection");
		callback(result);
	});
});


app.listen(3000);
console.log("App listening on port 3000");
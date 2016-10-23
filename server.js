// Requirements
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var assert = require('assert');
var bodyParser = require('body-parser');

// Connect to MongoDB
var url = 'mongodb://localhost:27017/project';
var database = '';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to MongoDB server.");
	database = db;
});

// Connect to MySQL
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'wsengine'
});

connection.connect(function(err) {
	if(err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('Connected correctly to MySQL server.');
});

// Express settings
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:'true'}));
app.use(bodyParser.json());


// REST API
app.get('/api/webshops', function(req, res) {
	connection.query("SELECT * FROM webshop", function(err, result) {
		if(err) res.send(err);
		console.log("Found the following webshops:");
		console.log(result);
		res.json(result);
	});
});

app.post('/api/webshops', function(req, res) {
	connection.query('INSERT INTO webshop SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
	});
});

app.get('/api/products', function(req, res) {
	var collection = database.collection('products');
	collection.find({}).toArray(function(err, docs) {
		if(err) res.send(err);
		console.log("Found the following products:");
		console.log(docs);
		res.json(docs);
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


// Listening on port 3000
app.listen(3000, function() {
	console.log("App listening on port 3000");
});

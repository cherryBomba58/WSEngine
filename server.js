// Requirements
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var assert = require('assert');
var bodyParser = require('body-parser');

// Connect to MongoDB
/*var url = 'mongodb://localhost:27017/project';
var database = '';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to MongoDB server.");
	database = db;
});*/

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
	connection.query('SELECT * FROM webshop', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshops:');
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
	connection.query('SELECT * FROM product', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following products: ');
		console.log(result);
		res.json(result);
		/*var collection = database.collection('products');
		collection.find({}).toArray(function(err, docs) {
			if(err) res.send(err);
			console.log("Found the following products:");
			console.log(docs);
			res.json(docs);
		});*/
	});
});

app.post('/api/products', function(req, res) {
	connection.query('INSERT INTO product SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		/*var collection = database.collection('products');
		collection.insert({_id:most_beszurt_id, attr1:req.body.attr1, attr2:req.body.attr2}, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			assert.equal(1, result.ops.length);
			console.log("Inserted 1 document into the products collection");
			callback(result);
		});*/
	});
});

app.get('/api/sells', function(req, res) {
	connection.query('SELECT * FROM sells', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop-product pairs:');
		console.log(result);
		res.json(result);
	});
});

app.post('/api/sells', function(req, res) {
	connection.query('INSERT INTO sells SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
	});
});


// Listening on port 3000
app.listen(3000, function() {
	console.log("App listening on port 3000");
});

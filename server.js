﻿// Requirements
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var assert = require('assert');
var bodyParser = require('body-parser');
var md5 = require('md5');
var multer = require('multer');
var upload = multer({dest: 'public/pictures/'});

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
// Getting webshop list to center site and admin site
app.get('/api/webshops', function(req, res) {
	connection.query('SELECT * FROM webshop', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshops:');
		console.log(result);
		res.json(result);
	});
});

// Getting info about a webshop to webshop Contact
app.get('/api/webshops/:webshopID', function(req, res) {
	connection.query('SELECT * FROM webshop WHERE url = ?', req.params.webshopID,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop infos:');
		console.log(result);
		res.json(result);
	});
});

// Creating new webshop on admin site
app.post('/api/webshops', function(req, res) {
	connection.query('INSERT INTO webshop SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Getting a product list on admin site
app.get('/api/products', function(req, res) {
	var collection = database.collection('products');
	collection.find({}).toArray(function(error, docs) {
		if(error) res.send(error);
		console.log("Found the following products:");
		console.log(docs);
		res.json(docs);
	});
});

// Getting info about a product to product details on webshop site
app.get('/api/products/:productID', function(req, res) {
	var collection = database.collection('products');
	collection.findOne({_id: parseInt(req.params.productID)}, function(error, docs) {
		if(error) res.send(error);
		console.log("Found the following product infos:");
		console.log(docs);
		res.json(docs);
	});
});

// Creating a new product on admin site, with picture upload + inserting special attributes
app.post('/api/products', upload.single('img'), function(req, res) {
	req.body.pictureUrl = (req.file !== undefined) ? "pictures/" + req.file.filename : null;
	
	// insert into MySQL table
	connection.query('INSERT INTO product(name, price, description, pictureUrl) VALUES(?,?,?,?)', 
	[req.body.name, req.body.price, req.body.description, req.body.pictureUrl],
	function(err, result) {
		if(err) res.send(err);
		console.log(result);
		
		// insert into MongoDB collection
		var collection = database.collection('products');
		collection.insert({_id:result.insertId, name: req.body.name, price: req.body.price,
		description: req.body.description, pictureUrl: req.body.pictureUrl, attributes: req.body.attributes}, 
		function(error, results) {
			assert.equal(error, null);
			assert.equal(1, results.result.n);
			assert.equal(1, results.ops.length);
			console.log("Inserted 1 document into the products collection");
			res.json(results);
		});
	});
});

// Getting info about webshop offers to admin site. It's quantity can be 0.
app.get('/api/sells', function(req, res) {
	connection.query('SELECT s.*, p.name AS productName, w.name AS webshopName FROM sells s ' + 
	'INNER JOIN product p ON s.productID = p.productID ' + 
	'INNER JOIN webshop w ON s.webshopID = w.url', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop-product pairs:');
		console.log(result);
		res.json(result);
	});
});

// Getting info about offers of a webshop to webshop main site. Their quantity must be greater than 0.
app.get('/api/sells/:webshopID', function(req, res) {
	connection.query('SELECT s.quantity, p.* FROM sells s ' + 
	'INNER JOIN product p ON s.productID = p.productID ' +
	'WHERE s.webshopID = ? AND s.quantity > 0', req.params.webshopID, function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop-product pairs of webshop:');
		console.log(result);
		res.json(result);
	});
});

// Creating an offer to a webshop on admin site: it's just a placing of a product to a webshop: it's quantity is 0.
app.post('/api/sells', function(req, res) {
	connection.query('INSERT INTO sells SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Updating an offer on admin site with quantity which is 0 by inserting: actually, it is offer creating to a webshop
app.put('/api/sells', function(req, res) {
	connection.query('UPDATE sells SET quantity = ? WHERE productID = ? AND webshopID = ?',
	[req.body.quantity, req.body.productID, req.body.webshopID], function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Getting list of webshop admins on admin site: their role must be 2 (webshop admin)
app.get('/api/wsadmins', function(req, res) {
	connection.query('SELECT u.*, w.name AS webshopName FROM user u ' +
	'INNER JOIN webshop w ON u.webshopID = w.url ' + 
	'WHERE u.roleID = 2', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop admins:');
		console.log(result);
		res.json(result);
	});
});

// Getting list of admins of a webshop to webshop Contact site: role 1 (global admin) is an admin of every webshop
app.get('/api/wsadmins/:webshopID', function(req, res) {
	connection.query('SELECT u.*, r.name AS roleName FROM user u ' +
	'INNER JOIN role r ON u.roleID = r.roleID ' +
	'WHERE u.roleID = 1 OR (u.roleID = 2 AND u.webshopID = ?)',
	req.params.webshopID, function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop admin infos:');
		console.log(result);
		res.json(result);
	});
});

// Getting info about a user to display it on My Data and to authenticate the user
app.get('/api/users/:username', function(req, res) {
	connection.query('SELECT * FROM user WHERE username = ?', req.params.username,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following user infos:');
		console.log(result);
		res.json(result);
	});
});

// Creating a new user: role 3 (buyer) on webshop Registrate site, and role 2 (webshop admin) on admin site
app.post('/api/users', function(req, res) {
	connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Getting a list of webshop orders to admin site
app.get('/api/orders', function(req, res) {
	connection.query('SELECT b.*, p.name AS productName, p.price, ' +
	's.name AS statusName, u.username, w.name AS webshopName FROM buy b ' +
	'INNER JOIN product p ON b.productID = p.productID ' +
	'INNER JOIN status s ON b.statusID = s.statusID ' +
	'INNER JOIN user u ON b.buyerID = u.userID ' +
	'INNER JOIN webshop w ON b.webshopID = w.url ' +
	'WHERE b.statusID != 1', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following order infos:');
		console.log(result);
		res.json(result);
	});
});

// Getting list of the orders in the cart of a user to webshop My Cart site
app.get('/api/cart/:userid', function(req, res) {
	connection.query('SELECT b.*, p.name AS productName, p.price FROM buy b ' +
	'INNER JOIN product p ON b.productID = p.productID ' +
	'WHERE b.buyerID = ? AND b.statusID = 1', req.params.userid,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following cart infos:');
		console.log(result);
		res.json(result);
	});
});

// Getting list of the orders of a user to webshop My Orders site 
app.get('/api/orders/:userid', function(req, res) {
	connection.query('SELECT b.*, p.name AS productName, p.price, ' +
	's.name AS statusName FROM buy b ' +
	'INNER JOIN product p ON b.productID = p.productID ' +
	'INNER JOIN status s ON b.statusID = s.statusID ' +
	'WHERE b.buyerID = ? AND b.statusID != 1', req.params.userid,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following order infos:');
		console.log(result);
		res.json(result);
	});
});

// Uploading an order of user to a webshop: actually, user takes some product quantity into cart
app.post('/api/orders', function(req, res) {
	connection.query('INSERT INTO buy SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Deleting an order on webshop site: actually, user deletes it from cart
app.delete('/api/orders/:transID', function(req, res) {
	connection.query('DELETE FROM buy WHERE transID = ?', req.params.transID,
	function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

// Ordering the content of cart: the stored procedure decreases webshop product offer quantity by bought quantity,
// and then updates the status of orders from 1 (cart) to 2 (ordered)
app.put('/api/orders/:userid/', function(req, res) {
	connection.query('CALL order_cart(?)', req.params.userid, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});


// Listening on port 3000
app.listen(3000, function() {
	console.log("App listening on port 3000");
});

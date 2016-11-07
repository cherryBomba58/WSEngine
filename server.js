// Requirements
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var assert = require('assert');
var bodyParser = require('body-parser');
var md5 = require('md5');

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

app.get('/api/webshops/:webshopID', function(req, res) {
	connection.query('SELECT * FROM webshop WHERE webshopID = ?', req.params.webshopID,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop infos:');
		console.log(result);
		res.json(result);
	});
});

app.post('/api/webshops', function(req, res) {
	connection.query('INSERT INTO webshop SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
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

app.get('/api/products/:productID', function(req, res) {
	connection.query('SELECT * FROM product WHERE productID = ?', req.params.productID,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following product infos: ');
		console.log(result);
		res.json(result);
		/*var collection = database.collection('products');
		collection.find({_id: req.params.productID}).toArray(function(err, docs) {
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
		res.json(result);
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
	connection.query('SELECT s.*, p.name AS productName, w.name AS webshopName FROM sells s ' + 
	'INNER JOIN product p ON s.productID = p.productID ' + 
	'INNER JOIN webshop w ON s.webshopID = w.webshopID', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop-product pairs:');
		console.log(result);
		res.json(result);
	});
});

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

app.post('/api/sells', function(req, res) {
	connection.query('INSERT INTO sells SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

app.put('/api/sells', function(req, res) {
	connection.query('UPDATE sells SET quantity = ? WHERE productID = ? AND webshopID = ?',
	[req.body.quantity, req.body.productID, req.body.webshopID], function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

app.get('/api/wsadmins', function(req, res) {
	connection.query('SELECT u.*, w.name AS webshopName FROM user u ' +
	'INNER JOIN webshop w ON u.webshopID = w.webshopID ' + 
	'WHERE u.roleID = 2', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following webshop admins:');
		console.log(result);
		res.json(result);
	});
});

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

app.get('/api/users/:username', function(req, res) {
	connection.query('SELECT * FROM user WHERE username = ?', req.params.username,
	function(err, result) {
		if(err) res.send(err);
		console.log('Found the following user infos:');
		console.log(result);
		res.json(result);
	});
});

app.post('/api/users', function(req, res) {
	connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

app.get('/api/orders', function(req, res) {
	connection.query('SELECT b.*, p.name AS productName, p.price, ' +
	's.name AS statusName, u.username, w.name AS webshopName FROM buy b ' +
	'INNER JOIN product p ON b.productID = p.productID ' +
	'INNER JOIN status s ON b.statusID = s.statusID ' +
	'INNER JOIN user u ON b.buyerID = u.userID ' +
	'INNER JOIN webshop w ON b.webshopID = w.webshopID ' +
	'WHERE b.statusID != 1', function(err, result) {
		if(err) res.send(err);
		console.log('Found the following order infos:');
		console.log(result);
		res.json(result);
	});
});

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

app.post('/api/orders', function(req, res) {
	connection.query('INSERT INTO buy SET ?', req.body, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

app.delete('/api/orders/:transID', function(req, res) {
	connection.query('DELETE FROM buy WHERE transID = ?', req.params.transID,
	function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});

app.put('/api/orders/:userid/', function(req, res) {
	connection.query('UPDATE buy SET statusID = 2 WHERE statusID = 1 AND buyerID = ?',
	req.params.userid, function(err, result) {
		if(err) res.send(err);
		console.log(result);
		res.json(result);
	});
});


// Listening on port 3000
app.listen(3000, function() {
	console.log("App listening on port 3000");
});

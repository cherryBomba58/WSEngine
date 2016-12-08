function AdminCtrl($scope, $http, md5, $cookies, $state, Upload) {
		$scope.webshops = [];
		$scope.products = [];
		$scope.sells = [];
		$scope.wsadmins = [];
		$scope.orders = [];
		$scope.fields = [];
		$scope.userinfo = {};
		
		// Shows the right functions to role 1 (global admin) and role 2 (webshop admin)
		$scope.displayMenus = function() {
			if($cookies.get('roleID') == 1) {
				$scope.onAdmin = {display: 'block'};
			}
			else {
				$scope.onAdmin = {display: 'none'};
			}
		}
		
		// Gets webshop list if role 1 is logged in, else, only the webshop of role 2 user
		$scope.getWebshops = function() {
			if($cookies.get('roleID') == 1) {
				$http.get('/api/webshops')
					.success(function(data) {
						$scope.webshops = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
			else {
				$http.get('/api/webshops/' + $cookies.get('webshopUrl'))
					.success(function(data) {
						$scope.webshops = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
		}
		
		// Gets product list
		$scope.getProducts = function() {
			$http.get('/api/products')
				.success(function(data) {
					$scope.products = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		// Gets webshop offer list
		$scope.getSells = function() {
			$http.get('/api/sells')
				.success(function(data) {
					$scope.sells = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
				
		// Gets webshop admin list
		$scope.getWebshopAdmins = function() {
			$http.get('/api/wsadmins')
				.success(function(data) {
					$scope.wsadmins = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		// Gets orders of buyers
		$scope.getOrders = function() {
			$http.get('/api/orders')
				.success(function(data) {
					$scope.orders = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		// Gets info about the logged in user
		$scope.getUserInfo = function() {
			$http.get('/api/users/' + $cookies.get('username'))
				.success(function(data) {
					$scope.userinfo = data[0];
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		// Creates new webshop
		$scope.createNewWebshop = function(name, bank, address, phone, email, url) {
			console.log(name, bank, address, phone, email, url);
			// url is the key, so it checks that is it given
			if(url == null) {
				alert("URL is required.");
				return;
			}
			// if a webshop exists with the given url, then it returns and alerts user
			$http.get('/api/webshops/' + url)
				.success(function(data) {
					if(data.length != 0) {
						alert("This URL is already existing! Choose another URL name.");
						return;
					}
					// else, if it doesn't exist, then we create it
					var body = {name: name, bankAccountNumber: bank, address: address, phone: phone, email: email, url: url};
					$http.post('/api/webshops', body)
						.success(function(data) {
							console.log(data);
							alert("New webshop created!");
						})
						.error(function(data) {
							console.log('Error: ' + data);
							alert("Sorry, something's wrong! Your webshop wasn't created.");
						});
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something is wrong!");
				});
		}
		
		// Adds a new field to the new product form to add special attributes
		$scope.addNewField = function() {
			$scope.fields.push('');
			console.log($scope.fields);
		}
		
		// Creates new product
		$scope.createNewProduct = function(name, description, price, img) {
			// Gets the arrays of special attribute names and values
			var fieldnames = document.getElementsByName('fieldname');
			var fieldvalues = document.getElementsByName('fieldvalue');
			console.log(fieldnames, fieldvalues);
			
			// Places names and values to each other: they will be special attributes
			var attributes = [];
			for (var i=0; i<fieldnames.length; i++) {
				attributes.push({fieldname: fieldnames[i].value, 
								 fieldvalue: fieldvalues[i].value});
			}
			
			// ng-file-upload uploads the given picture, the given data of product and the special attributes
			Upload.upload({
				url: '/api/products',
				data: {img: img, name: name, price: price, description: description, attributes: attributes}
			}).success(function(data) {
				console.log(data);
				alert("New product created!");
			}).error(function(data) {
				console.log('Error: ' + data);
				alert("Sorry, something's wrong!");
			});
		}
		
		// Places a product to a webshop: creates an offer that the given webshop sells 0 given products
		// only global admin can do it
		$scope.placeProductToWebshop = function(webshop, product) {
			console.log(webshop, product);
			var body = {productID: product, webshopID: webshop, quantity: 0};
			$http.post('/api/sells', body)
				.success(function(data) {
					console.log(data);
					alert("Product placed to webshop!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
		
		// Creates new offer: updates the placed product-webshop pair with a quantity
		// global and webshop admin can do it, too
		$scope.createNewOffer = function(webshop, product, quan) {
			console.log(webshop, product, quan);
			var body = {productID: product, webshopID: webshop, quantity: quan};
			$http.put('/api/sells', body)
				.success(function(data) {
					console.log(data);
					alert("Offer updated!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
		
		// Registrates a new webshop admin
		$scope.createNewWsAdmin = function(fullname, username, email, phone, webshop, pass1, pass2) {
			// if the two given passwords are not equal, then it returns and alerts user
			if(pass1 != pass2) {
				alert("The two passwords aren't equal!");
				return;
			}
			console.log(fullname, username, md5.createHash(pass1), md5.createHash(pass2), email, phone, webshop);
			
			// if a user exists with the given username, then the account can't be created
			$http.get('/api/users/' + username)
				.success(function(data) {
					console.log(data);
					if(data.length != 0) {
						alert("This user already exists!");
						return;
					}

					// else, it creates the new webshop admin user
					var body = {fullname: fullname, username: username, password: md5.createHash(pass1), email: email, phone: phone, roleID: 2, webshopID: webshop};
					$http.post('/api/users', body)
						.success(function(data) {
							console.log(data);
							alert("New webshop admin created!");
						})
						.error(function(data) {
							console.log('Error: ' + data);
							alert("Sorry, something's wrong! The account wasn't created.");
						});
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
		
		// Logs out user, deletes the cookies, and redirects to admin login site
		$scope.logoutAdmin = function() {
			$cookies.remove('userID');
			$cookies.remove('username');
			$cookies.remove('roleID');
			$cookies.remove('webshopUrl');
			$state.go('login');
		}
	}
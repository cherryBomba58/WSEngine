function AdminCtrl($scope, $http, md5, $cookies, $state) {
		$scope.webshops = [];
		$scope.products = [];
		$scope.sells = [];
		$scope.wsadmins = [];
		$scope.orders = [];
		$scope.fields = [];
		$scope.num = 0;
		
		$scope.getWebshops = function() {
			$http.get('/api/webshops')
				.success(function(data) {
					$scope.webshops = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
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
		
		$scope.createNewWebshop = function(name, bank, address, phone, email, url) {
			console.log(name, bank, address, phone, email, url);
			if(url == null) {
				alert("URL is required.");
				return;
			}
			$http.get('/api/webshops/' + url)
				.success(function(data) {
					if(data.length != 0) {
						alert("This URL is already existing! Choose another URL name.");
						return;
					}
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
		
		$scope.addNewField = function() {
			$scope.num += 1;
			$scope.fields.push({fielddis: "fielddis" + $scope.num, 
								fieldname: "fieldname" + $scope.num, 
								fieldvalue: "fieldvalue" + $scope.num});
			console.log($scope.fields);
		}
		
		$scope.createNewProduct = function(name, desc, price) {
			console.log(name, desc, price);
			var body = {name: name, price: price, description: desc};
			$http.post('/api/products', body)
				.success(function(data) {
					console.log(data);
					alert("New product created!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
		
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
		
		$scope.createNewWsAdmin = function(fullname, username, email, phone, webshop, pass1, pass2) {
			if(pass1 != pass2) {
				alert("The two passwords aren't equal!");
				return;
			}
			console.log(fullname, username, md5.createHash(pass1), md5.createHash(pass2), email, phone, webshop);
			
			$http.get('/api/users/' + username)
				.success(function(data) {
					console.log(data);
					if(data.length != 0) {
						alert("This user already exists!");
						return;
					}

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
		
		$scope.logoutAdmin = function() {
			$cookies.remove('userID');
			$cookies.remove('username');
			$cookies.remove('roleID');
			$cookies.remove('webshopUrl');
			$state.go('login');
		}
	}
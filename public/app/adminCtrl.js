function AdminCtrl($scope, $http, md5) {
		$scope.webshops = [];
		$scope.products = [];
		$scope.sells = [];
		$scope.wsadmins = [];
		
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
		
		$scope.createNewWebshop = function(name, bank, address, phone, email) {
			console.log(name, bank, address, phone, email);
			var body = {name: name, bankAccountNumber: bank, address: address, phone: phone, email: email};
			$http.post('/api/webshops', body)
				.success(function(data) {
					console.log(data);
					alert("New webshop created!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
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
		
		$scope.createNewWsAdmin = function(fullname, username, pass, email, phone, webshop) {
			console.log(fullname, username, md5.createHash(pass), email, phone, webshop);
			var body = {fullname: fullname, username: username, password: md5.createHash(pass), email: email, phone: phone, roleID: 2, webshopID: webshop};
			$http.post('/api/users', body)
				.success(function(data) {
					console.log(data);
					alert("New webshop admin created!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
	}
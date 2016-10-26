function AdminCtrl($scope, $http, md5) {
		$scope.webshops = [];
		$scope.products = [];
		$scope.sells = [];
		$scope.wsadmins = [];
		
		$http.get('/api/webshops')
			.success(function(data) {
				$scope.webshops = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$http.get('/api/products')
			.success(function(data) {
				$scope.products = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$http.get('/api/sells')
			.success(function(data) {
				$scope.sells = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$http.get('/api/wsadmins')
			.success(function(data) {
				$scope.wsadmins = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$scope.createNewWebshop = function(name, bank, address, phone, email) {
			console.log(name, bank, address, phone, email);
			var body = {name: name, bankAccountNumber: bank, address: address, phone: phone, email: email};
			$http.post('/api/webshops', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		$scope.createNewProduct = function(name, desc, price) {
			console.log(name, desc, price);
			var body = {name: name, price: price, description: desc};
			$http.post('/api/products', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		$scope.placeProductToWebshop = function(webshop, product) {
			console.log(webshop, product);
			var body = {productID: product, webshopID: webshop, quantity: 0};
			$http.post('/api/sells', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		$scope.createNewOffer = function(webshop, product, quan) {
			console.log(webshop, product, quan);
			var body = {productID: product, webshopID: webshop, quantity: quan};
			$http.put('/api/sells', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		$scope.createNewWsAdmin = function(fullname, username, pass, email, phone, webshop) {
			console.log(fullname, username, md5.createHash(pass), email, phone, webshop);
			var body = {fullname: fullname, username: username, password: md5.createHash(pass), email: email, phone: phone, roleID: 2, webshopID: webshop};
			$http.post('/api/wsadmins', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	}
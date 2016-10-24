function AdminCtrl($scope, $http) {
		$scope.webshops = [];
		$scope.products = [];
		$scope.sells = [];
		
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
	}
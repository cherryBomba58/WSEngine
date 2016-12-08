function WebshopCartCtrl($scope, $http, $cookies) {
	$scope.cart = [];
	$scope.totalPrice = 0;

	// Gets the content of the cart of logged in user
	$scope.getCart = function() {
		$http.get('/api/cart/' + $cookies.get('userID'))
			.success(function(data) {
				$scope.cart = data;
				console.log(data);
				$scope.getTotalPrice();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
	
	// Counts the total price of the titles in cart
	$scope.getTotalPrice = function() {
		var value = 0;
		$scope.cart.forEach(function(c) {
			value += c.quantity*c.price;
		})
		console.log(value);
		$scope.totalPrice = value;
	}

	// Deletes title from cart
	$scope.deleteFromCart = function(transID) {
		$http.delete('/api/orders/' + transID)
			.success(function(data) {
				console.log(data);
				$scope.getCart();
				alert("Product deleted from cart successfully!");
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert("Something went wrong. The deleting didn't succeed.");
			});
	}
	
	// Orders the content of the cart: order status update
	$scope.orderCartContent = function() {
		if($scope.cart.length == 0) {
			alert("You have no items in cart!");
			return;
		}
		$http.put('/api/orders/' + $cookies.get('userID'))
			.success(function(data) {
				console.log(data);
				$scope.getCart();
				alert("Products ordered successfully!");
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert("Something went wrong. The ordering didn't succeed.");
			});
	}

}
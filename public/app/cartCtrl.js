function CartCtrl($scope, $http, $cookies) {
	$scope.cart = [];
	$scope.totalPrice = 0;

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
	
	$scope.getTotalPrice = function() {
		var value = 0;
		$scope.cart.forEach(function(c) {
			value += c.quantity*c.price;
		})
		console.log(value);
		$scope.totalPrice = value;
	}

	$scope.deleteFromCart = function(transID) {
		$http.delete('/api/orders/' + transID)
			.success(function(data) {
				console.log(data);
				$scope.getCart();
				alert("Product deleted from cart successfully!");
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert("Something went wrong. The deleting didn't succeeded.");
			});
	}
	
	$scope.orderCartContent = function() {
		$http.put('/api/orders/' + $cookies.get('userID'))
			.success(function(data) {
				console.log(data);
				$scope.getCart();
				if(data.affectedRows == 0) {
					alert("You have no items in cart!");
				}
				else {
					alert("Products ordered successfully!");
				}
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert("Something went wrong. The ordering didn't succeeded.");
			});
	}

}
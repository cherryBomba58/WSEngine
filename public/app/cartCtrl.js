function CartCtrl($scope, $http, $cookies) {
	$scope.cart = [];

	$http.get('/api/cart/' + $cookies.get('userID'))
		.success(function(data) {
			$scope.cart = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}
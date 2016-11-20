function WebshopOrderCtrl($scope, $http, $cookies) {
	$scope.orders = [];

	$http.get('/api/orders/' + $cookies.get('userID'))
		.success(function(data) {
			$scope.orders = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
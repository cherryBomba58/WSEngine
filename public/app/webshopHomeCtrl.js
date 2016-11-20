function WebshopHomeCtrl($scope, $http) {
	$scope.sells = [];

	$http.get('/api/sells/' + $scope.webshopUrl)
		.success(function(data) {
			$scope.sells = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
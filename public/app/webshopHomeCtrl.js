function WebshopHomeCtrl($scope, $http) {
	$scope.sells = [];

	// Gets offers of actual webshop
	$http.get('/api/sells/' + $scope.webshopUrl)
		.success(function(data) {
			$scope.sells = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
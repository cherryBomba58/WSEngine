function WebshopAboutCtrl($scope, $http) {
	$scope.admins = [];
	
	// Gets admins of webshop
	$http.get('/api/wsadmins/' + $scope.webshopUrl)
		.success(function(data) {
			$scope.admins = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
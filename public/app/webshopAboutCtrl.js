function WebshopAboutCtrl($scope, $http) {
	$scope.admins = [];

	$http.get('/api/wsadmins/' + $scope.webshopUrl)
		.success(function(data) {
			$scope.admins = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
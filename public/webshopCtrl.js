function WebshopCtrl($scope, $stateParams, $http) {
		$scope.webshopID = $stateParams.webshopID;
		$scope.sells = [];
		
		$http.get('/api/sells/' + $scope.webshopID)
			.success(function(data) {
				$scope.sells = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
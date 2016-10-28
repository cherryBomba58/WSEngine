function ItemCtrl($scope, $stateParams, $http) {
		$scope.productID = $stateParams.productID;
		$scope.product = {};
		
		$http.get('/api/products/' + $scope.productID)
			.success(function(data) {
				$scope.product = data[0];
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
function WebshopCtrl($scope, $stateParams, $http) {
		$scope.webshopID = $stateParams.webshopID;
		$scope.sells = [];
		$scope.webshop = {};
		$scope.admins = [];
		
		$http.get('/api/sells/' + $scope.webshopID)
			.success(function(data) {
				$scope.sells = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$http.get('/api/webshops/' + $scope.webshopID)
			.success(function(data) {
				$scope.webshop = data[0];
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$http.get('/api/wsadmins/' + $scope.webshopID)
			.success(function(data) {
				$scope.admins = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
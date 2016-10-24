function WebshopCtrl($scope, $stateParams, $http) {
		$scope.webshopID = $stateParams.webshopID;
		$scope.sells = [];
		$scope.name = "";
		$scope.bank = "";
		$scope.address = "";
		$scope.phone = "";
		$scope.email = "";
		
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
				$scope.name = data[0].name;
				$scope.bank = data[0].bankAccountNumber;
				$scope.address = data[0].address;
				$scope.phone = data[0].phone;
				$scope.email = data[0].email;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
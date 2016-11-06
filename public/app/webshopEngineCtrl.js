function WebshopEngineCtrl($scope, $http, $cookies, $state) {
		$scope.webshops = [];
		
		$http.get('/api/webshops')
			.success(function(data) {
				$scope.webshops = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$scope.goToAdminSite = function() {
			if(($cookies.get('userID') !== undefined) && ($cookies.get('username') !== undefined) && ($cookies.get('roleID') != 3)) {
				$state.go('admin.home');
			}
			else {
				$state.go('login');
			}
		}
	}
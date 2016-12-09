function WSEngineCtrl($scope, $http, $cookies, $state) {
		$scope.webshops = [];
		
		// Gets webshop list to display them on center site
		$http.get('/api/webshops')
			.success(function(data) {
				$scope.webshops = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		// If an admin is logged in and would like to go back to admin site,
		// then not the login site, but the admin home site appears,
		// else, if no admin is logged in, then login site appears
		$scope.goToAdminSite = function() {
			if(($cookies.get('userID') !== undefined) && ($cookies.get('username') !== undefined) && ($cookies.get('roleID') != 3)) {
				$state.go('admin.home');
			}
			else {
				$state.go('login');
			}
		}
	}
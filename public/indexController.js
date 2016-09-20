angular.module("wEngineApp", []).controller("wEngineCtrl", function($scope, $http) {
	$scope.webshops = [];
	
	$http.get('/api/webshops')
		.success(function(data) {
			$scope.webshops = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
});
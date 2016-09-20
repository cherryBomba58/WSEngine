angular.module("wEngineApp", []).controller("wEngineCtrl", function($scope, $http) {
	$scope.webshops = [];
	$scope.products = [];
	
	$http.get('/api/webshops')
		.success(function(data) {
			$scope.webshops = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	$http.get('/api/products')
		.success(function(data) {
			$scope.products = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

});
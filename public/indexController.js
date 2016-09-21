angular.module("WebshopEngineApp", ["ngRoute"])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html'
			})
			.when('/webshops/:webshopID', {
				templateUrl: 'webshop.html',
				controller: 'WebshopCtrl'
			});
	})
	.controller("WebshopEngineCtrl", function($scope, $http) {
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

	})
	.controller("WebshopCtrl", function($scope, $routeParams) {
		$scope.webshopID = $routeParams.webshopID;
	});
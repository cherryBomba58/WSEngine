angular.module("WebshopEngineApp", ["ui.router"])
	.config(function($stateProvider) {
		$stateProvider
			.state({
				name: 'root',
				url: '',
				templateUrl: 'home.html'
			})
			.state({
				name: 'webshops',
				url: '/webshops/{webshopID}',
				templateUrl: 'webshop/index.html',
				controller: 'WebshopCtrl'
			})
			.state({
				name: 'admin',
				url: '/admin',
				templateUrl: 'admin/index.html'
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
	.controller("WebshopCtrl", function($scope, $stateParams) {
		$scope.webshopID = $stateParams.webshopID;
	});
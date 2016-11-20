﻿function WebshopCtrl($scope, $stateParams, $http, md5, $cookies, $state) {
	$scope.webshopUrl = $stateParams.url;
	$scope.webshop = {};
		
	// hide or show navigation menupoints: is a buyer logged in or not?
	$scope.refreshMenu = function() {
		if(($cookies.get('userID') !== undefined) && ($cookies.get('roleID') == 3) && ($cookies.get('webshopUrl') == $scope.webshopUrl)) {
			$scope.onPublic = {display: 'none'};
			$scope.onCookie = {display: 'block'};
		}
		else {
			$scope.onCookie = {display: 'none'};
			$scope.onPublic = {display: 'block'};
		}
	}
		
	// webshop data is needed on every page of webshop, so it's here in parent controller
	$http.get('/api/webshops/' + $scope.webshopUrl)
		.success(function(data) {
			$scope.webshop = data[0];
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	// logout must be available from everywhere
	$scope.logoutBuyer = function() {
		$cookies.remove('userID');
		$cookies.remove('username');
		$cookies.remove('roleID');
		$cookies.remove('webshopUrl');
		$scope.refreshMenu();
		$state.go('webshops.home');
	}
}
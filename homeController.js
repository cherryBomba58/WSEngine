angular.module("wEngineApp", []).controller("wEngineCtrl", function($scope) {
	$scope.webshops = [
		{name: 'Webshop1', url:'#', webshopID: 1},
		{name: 'Webshop2', url:'#', webshopID: 2},
		{name: 'Webshop3', url:'#', webshopID: 3}
	];
});
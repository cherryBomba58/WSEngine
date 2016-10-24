angular.module("WebshopEngineApp", ["ui.router"])
	.config(['$stateProvider', Routes])
	.controller("WebshopEngineCtrl", ['$scope', '$http', WebshopEngineCtrl])
	.controller("WebshopCtrl", ['$scope', '$stateParams', '$http', WebshopCtrl])
	.controller("AdminCtrl", ['$scope', '$http', AdminCtrl]);
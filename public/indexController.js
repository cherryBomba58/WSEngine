angular.module("WebshopEngineApp", ["ui.router", "angular-md5"])
	.config(['$stateProvider', Routes])
	.controller("WebshopEngineCtrl", ['$scope', '$http', WebshopEngineCtrl])
	.controller("WebshopCtrl", ['$scope', '$stateParams', '$http', WebshopCtrl])
	.controller("ItemCtrl", ['$scope', '$stateParams', '$http', ItemCtrl])
	.controller("AdminCtrl", ['$scope', '$http', 'md5', AdminCtrl]);
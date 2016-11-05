angular.module("WebshopEngineApp", ["ui.router", "angular-md5", "ngCookies"])
	.config(['$stateProvider', Routes])
	.controller("WebshopEngineCtrl", ['$scope', '$http', WebshopEngineCtrl])
	.controller("WebshopCtrl", ['$scope', '$stateParams', '$http', 'md5', '$cookies', '$state', WebshopCtrl])
	.controller("ItemCtrl", ['$scope', '$stateParams', '$http', '$cookies', ItemCtrl])
	.controller("LoginAdminCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', LoginAdminCtrl])
	.controller("AdminCtrl", ['$scope', '$http', 'md5', AdminCtrl]);
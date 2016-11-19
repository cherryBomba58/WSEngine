angular.module("WebshopEngineApp", ["ui.router", "angular-md5", "ngCookies", "ngFileUpload"])
	.config(['$stateProvider', Routes])
	.controller("WebshopEngineCtrl", ['$scope', '$http', '$cookies', '$state', WebshopEngineCtrl])
	.controller("WebshopCtrl", ['$scope', '$stateParams', '$http', 'md5', '$cookies', '$state', WebshopCtrl])
	.controller("ItemCtrl", ['$scope', '$stateParams', '$http', '$cookies', ItemCtrl])
	.controller("CartCtrl", ['$scope', '$http', '$cookies', CartCtrl])
	.controller("OrderCtrl", ['$scope', '$http', '$cookies', OrderCtrl])
	.controller("LoginAdminCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', LoginAdminCtrl])
	.controller("AdminCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', 'Upload', AdminCtrl]);
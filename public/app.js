// Main AngularJS controller: registrates routes in config, and then the controllers, from route parent to children
angular.module("WebshopEngineApp", ["ui.router", "angular-md5", "ngCookies", "ngFileUpload"])
	.config(['$stateProvider', Routes])
	.controller("WSEngineCtrl", ['$scope', '$http', '$cookies', '$state', WSEngineCtrl])
	.controller("WebshopCtrl", ['$scope', '$stateParams', '$http', 'md5', '$cookies', '$state', WebshopCtrl])
	.controller("WebshopHomeCtrl", ['$scope', '$http', WebshopHomeCtrl])
	.controller("WebshopAboutCtrl", ['$scope', '$http', WebshopAboutCtrl])
	.controller("WebshopItemCtrl", ['$scope', '$stateParams', '$http', '$cookies', WebshopItemCtrl])
	.controller("WebshopCartCtrl", ['$scope', '$http', '$cookies', WebshopCartCtrl])
	.controller("WebshopOrderCtrl", ['$scope', '$http', '$cookies', WebshopOrderCtrl])
	.controller("WebshopRegistCtrl", ['$scope', '$http', 'md5', WebshopRegistCtrl])
	.controller("WebshopLoginCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', WebshopLoginCtrl])
	.controller("AdminLoginCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', AdminLoginCtrl])
	.controller("AdminCtrl", ['$scope', '$http', 'md5', '$cookies', '$state', 'Upload', AdminCtrl]);
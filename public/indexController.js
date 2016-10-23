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
				name: 'webshops.home',
				url: '/home',
				templateUrl: 'webshop/pages/home.html',
			})
			.state({
				name: 'webshops.notfound',
				url: '/notfound',
				templateUrl: 'webshop/pages/404.html',
			})
			.state({
				name: 'webshops.about',
				url: '/about',
				templateUrl: 'webshop/pages/about.html',
			})
			.state({
				name: 'webshops.contact',
				url: '/contact',
				templateUrl: 'webshop/pages/contact.html',
			})
			.state({
				name: 'webshops.faq',
				url: '/faq',
				templateUrl: 'webshop/pages/faq.html',
			})
			.state({
				name: 'webshops.myorders',
				url: '/myorders',
				templateUrl: 'webshop/pages/myorders.html',
			})
			.state({
				name: 'webshops.login',
				url: '/login',
				templateUrl: 'webshop/pages/login.html',
			})
			.state({
				name: 'webshops.portfolio1',
				url: '/portfolio1',
				templateUrl: 'webshop/pages/portfolio-1-col.html',
			})
			.state({
				name: 'webshops.portfolio2',
				url: '/portfolio2',
				templateUrl: 'webshop/pages/portfolio-2-col.html',
			})
			.state({
				name: 'webshops.portfolio3',
				url: '/portfolio3',
				templateUrl: 'webshop/pages/portfolio-3-col.html',
			})
			.state({
				name: 'webshops.portfolio4',
				url: '/portfolio4',
				templateUrl: 'webshop/pages/portfolio-4-col.html',
			})
			.state({
				name: 'webshops.item',
				url: '/item',
				templateUrl: 'webshop/pages/portfolio-item.html',
			})
			.state({
				name: 'webshops.regist',
				url: '/regist',
				templateUrl: 'webshop/pages/regist.html',
			})
			.state({
				name: 'webshops.mydata',
				url: '/mydata',
				templateUrl: 'webshop/pages/mydata.html',
			})
			.state({
				name: 'admin',
				url: '/admin',
				templateUrl: 'admin/index.html',
				controller: 'AdminCtrl'
			})
			.state({
				name: 'admin.home',
				url: '/home',
				templateUrl: 'admin/pages/home.html'
			})
			.state({
				name: 'admin.orders',
				url: '/orders',
				templateUrl: 'admin/pages/orders.html'
			})
			.state({
				name: 'admin.ordersarchive',
				url: '/orders-archive',
				templateUrl: 'admin/pages/orders-archive.html'
			})
			.state({
				name: 'admin.offers',
				url: '/offers',
				templateUrl: 'admin/pages/offers.html'
			})
			.state({
				name: 'admin.offersnew',
				url: '/offers-new',
				templateUrl: 'admin/pages/offers-new.html'
			})
			.state({
				name: 'admin.mywebshops',
				url: '/my-webshops',
				templateUrl: 'admin/pages/webshops.html'
			})
			.state({
				name: 'admin.webshopsnew',
				url: '/webshops-new',
				templateUrl: 'admin/pages/webshops-new.html'
			})
			.state({
				name: 'admin.placeproducts',
				url: '/place-products',
				templateUrl: 'admin/pages/place-products.html'
			})
			.state({
				name: 'admin.wsadmins',
				url: '/wsadmins',
				templateUrl: 'admin/pages/wsadmins.html'
			})
			.state({
				name: 'admin.wsadminsnew',
				url: '/wsadmins-new',
				templateUrl: 'admin/pages/wsadmins-new.html'
			})
			.state({
				name: 'admin.categories',
				url: '/categories',
				templateUrl: 'admin/pages/categories.html'
			})
			.state({
				name: 'admin.categoriesnew',
				url: '/categories-new',
				templateUrl: 'admin/pages/categories-new.html'
			})
			.state({
				name: 'admin.products',
				url: '/products',
				templateUrl: 'admin/pages/products.html'
			})
			.state({
				name: 'admin.productsnew',
				url: '/products-new',
				templateUrl: 'admin/pages/products-new.html'
			})
			.state({
				name: 'admin.mydata',
				url: '/mydata',
				templateUrl: 'admin/pages/mydata.html'
			})
			.state({
				name: 'admin.mydatamodify',
				url: '/mydata-modify',
				templateUrl: 'admin/pages/mydata-modify.html'
			})
			.state({
				name: 'login',
				url: '/login',
				templateUrl: 'admin/pages/login.html'
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
	})
	.controller("WebshopCtrl", function($scope, $stateParams) {
		$scope.webshopID = $stateParams.webshopID;
	})
	.controller("AdminCtrl", function($scope, $http) {
		$scope.webshops = [];
		
		$http.get('/api/webshops')
			.success(function(data) {
				$scope.webshops = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$scope.createNewWebshop = function(name, bank, address, phone, email) {
			console.log(name, bank, address, phone, email);
			var body = {name: name, bankAccountNumber: bank, address: address, phone: phone, email: email};
			$http.post('/api/webshops', body)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	});
	
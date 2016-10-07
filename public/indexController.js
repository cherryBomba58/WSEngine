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
				name: 'webshops.fullwidth',
				url: '/fullwidth',
				templateUrl: 'webshop/pages/full-width.html',
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
				name: 'webshops.sidebar',
				url: '/sidebar',
				templateUrl: 'webshop/pages/sidebar.html',
			})
			.state({
				name: 'admin',
				url: '/admin',
				templateUrl: 'admin/index.html'
			})
			.state({
				name: 'admin.home',
				url: '/home',
				templateUrl: 'admin/pages/home.html'
			})
			.state({
				name: 'admin.blank',
				url: '/blank',
				templateUrl: 'admin/pages/blank.html'
			})
			.state({
				name: 'admin.buttons',
				url: '/buttons',
				templateUrl: 'admin/pages/buttons.html'
			})
			.state({
				name: 'admin.flot',
				url: '/flot',
				templateUrl: 'admin/pages/flot.html'
			})
			.state({
				name: 'admin.forms',
				url: '/forms',
				templateUrl: 'admin/pages/forms.html'
			})
			.state({
				name: 'admin.grid',
				url: '/grid',
				templateUrl: 'admin/pages/grid.html'
			})
			.state({
				name: 'admin.icons',
				url: '/icons',
				templateUrl: 'admin/pages/icons.html'
			})
			.state({
				name: 'admin.morris',
				url: '/morris',
				templateUrl: 'admin/pages/morris.html'
			})
			.state({
				name: 'admin.notifications',
				url: '/notifications',
				templateUrl: 'admin/pages/notifications.html'
			})
			.state({
				name: 'admin.panelswells',
				url: '/panelswells',
				templateUrl: 'admin/pages/panels-wells.html'
			})
			.state({
				name: 'admin.tables',
				url: '/tables',
				templateUrl: 'admin/pages/tables.html'
			})
			.state({
				name: 'admin.typography',
				url: '/typography',
				templateUrl: 'admin/pages/typography.html'
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
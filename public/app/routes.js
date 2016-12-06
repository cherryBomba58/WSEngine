function Routes($stateProvider) {
		$stateProvider
			.state({
				name: 'root',
				url: '',
				templateUrl: 'home.html',
				controller: 'WSEngineCtrl'
			})
			.state({
				name: 'webshops',
				url: '/webshops/{url}',
				templateUrl: 'webshop/index.html',
				controller: 'WebshopCtrl'
			})
			.state({
				name: 'webshops.home',
				url: '/home',
				templateUrl: 'webshop/pages/home.html',
				controller: 'WebshopHomeCtrl'
			})
			.state({
				name: 'webshops.item',
				url: '/item/{productID}',
				templateUrl: 'webshop/pages/portfolio-item.html',
				controller: 'WebshopItemCtrl'
			})
			.state({
				name: 'webshops.about',
				url: '/about',
				templateUrl: 'webshop/pages/about.html',
				controller: 'WebshopAboutCtrl'
			})
			.state({
				name: 'webshops.contact',
				url: '/contact',
				templateUrl: 'webshop/pages/contact.html'
			})
			.state({
				name: 'webshops.myorders',
				url: '/myorders',
				templateUrl: 'webshop/pages/myorders.html',
				controller: 'WebshopOrderCtrl'
			})
			.state({
				name: 'webshops.mycart',
				url: '/mycart',
				templateUrl: 'webshop/pages/mycart.html',
				controller: 'WebshopCartCtrl'
			})
			.state({
				name: 'webshops.login',
				url: '/login',
				templateUrl: 'webshop/pages/login.html',
				controller: 'WebshopLoginCtrl'
			})
			.state({
				name: 'webshops.regist',
				url: '/regist',
				templateUrl: 'webshop/pages/regist.html',
				controller: 'WebshopRegistCtrl'
			})
			.state({
				name: 'webshops.mydata',
				url: '/mydata',
				templateUrl: 'webshop/pages/mydata.html'
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
				name: 'login',
				url: '/login',
				templateUrl: 'admin/pages/login.html',
				controller: 'AdminLoginCtrl'
			});
	}
	
function WebshopItemCtrl($scope, $stateParams, $http, $cookies) {
		$scope.productID = $stateParams.productID;
		$scope.product = {};
		
		// Gets info about the actual product which is displayed on the details site
		$http.get('/api/products/' + $scope.productID)
			.success(function(data) {
				$scope.product = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		// Puts the product into cart, with the given quantity parameter
		$scope.addToCart = function(quan) {
			// Collect data to create the order with status 1 (cart)
			var buyerID = $cookies.get('userID');
			var webshopUrl = $scope.webshopUrl;
			if(buyerID === undefined || $cookies.get('roleID') != 3 || $cookies.get('webshopUrl') != webshopUrl) {
				alert("You are not logged in! Please log in to use the cart!");
				return;
			}
			var productID = $scope.productID;
			var statusID = 1;
			var date = new Date();
			
			// Converting date to the form MySQL accepts
			/* The DATETIME type is used for values that contain both date and time parts.
			 MySQL retrieves and displays DATETIME values in 'YYYY-MM-DD HH:MM:SS' format.
			 The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.
			 Source: http://dev.mysql.com/doc/refman/5.7/en/datetime.html */
			 
			var Y = date.getFullYear();
			var M = date.getMonth()+1;
			var D = date.getDate();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			
			var datetime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
			
			// Collected data is written to body
			var body = {buyerID: buyerID, webshopID: webshopUrl, productID: productID, statusID: statusID, quantity: quan, datetime: datetime};
			
			// Creating new order in cart
			$http.post('/api/orders', body)
				.success(function(data) {
					alert("You put the product into cart successfully!");
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something went wrong.");
				});			
		}
	}
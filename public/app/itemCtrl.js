function ItemCtrl($scope, $stateParams, $http, $cookies) {
		$scope.productID = $stateParams.productID;
		$scope.product = {};
		
		$http.get('/api/products/' + $scope.productID)
			.success(function(data) {
				$scope.product = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$scope.addToCart = function(quan) {
			var buyerID = $cookies.get('userID');
			var webshopUrl = $scope.webshopUrl;
			if(buyerID === undefined || $cookies.get('roleID') != 3 || $cookies.get('webshopUrl') != webshopUrl) {
				alert("You are not logged in! Please log in to use the cart!");
				return;
			}
			var productID = $scope.productID;
			var statusID = 1;
			var date = new Date();
			
			// MySQL-nek megfelelő alakba konvertáljuk át a Date-et
			/* The DATETIME type is used for values that contain both date and time parts.
			 MySQL retrieves and displays DATETIME values in 'YYYY-MM-DD HH:MM:SS' format.
			 The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.*/
			 
			var Y = date.getFullYear();
			var M = date.getMonth()+1;
			var D = date.getDate();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			
			var datetime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
			
			var body = {buyerID: buyerID, webshopID: webshopUrl, productID: productID, statusID: statusID, quantity: quan, datetime: datetime};
			console.log(body);
			
			$http.post('/api/orders', body)
				.success(function(data) {
					console.log(data);
					alert("You put the product into cart successfully!");
				})
				.error(function(data) {
					console.log("Error: " + data);
					alert("Sorry, something went wrong.");
				});
			
			// category-k általános kezelésére való kutatás része
			var valtozo1 = body.buyerID;
			console.log(valtozo1);
			var valtozo2 = body["buyerID"];
			console.log(valtozo2);
			var szoveg = "buyerID";
			var valtozo3 = body[szoveg];
			console.log(valtozo3);
		}
	}
function ItemCtrl($scope, $stateParams, $http, $cookies) {
		$scope.productID = $stateParams.productID;
		$scope.product = {};
		
		$http.get('/api/products/' + $scope.productID)
			.success(function(data) {
				$scope.product = data[0];
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$scope.addToCart = function(quan) {
			var buyerID = $cookies.get('userID');
			var webshopID = $scope.webshopID;
			if(buyerID === undefined || $cookies.get('roleID') != 3 || $cookies.get('webshopID') != $scope.webshopID) {
				alert("You are not logged in! Please log in to use the cart!");
				return;
			}
			var productID = $scope.productID;
			var statusID = 1;
			var date = new Date();
			console.log(buyerID, webshopID, productID, statusID, quan, date);
		}
	}
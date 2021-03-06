﻿function WebshopLoginCtrl($scope, $http, md5, $cookies, $state) {

	// Login the buyer user on webshop
	$scope.loginBuyer = function(username, pass) {
		// if the given user doesn't exist, or isn't a buyer, or isn't registrated to the actual webshop,
		// or the password is wrong, then alert comes up
		$http.get('/api/users/' + username)
			.success(function(data) {
				if(data.length == 0 || data[0].roleID != 3 || data[0].webshopID != $scope.webshopUrl) {
					alert("Wrong username!");
					return;
				}
				if(data[0].password != md5.createHash(pass)) {
					alert("Wrong password!");
					return;
				}
				// putting data about user to cookies, then refresh menu and redirect to webshop home site
				$cookies.put('userID', data[0].userID);
				$cookies.put('username', data[0].username);
				$cookies.put('roleID', data[0].roleID);
				$cookies.put('webshopUrl', $scope.webshopUrl);
				$scope.refreshMenu();
				$state.go('webshops.home');
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert("Sorry, something's wrong! Your login didn't succeed because of a server error.");
			});
	}
}
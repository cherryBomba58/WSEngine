﻿function WebshopCtrl($scope, $stateParams, $http, md5, $cookies, $state) {
		$scope.webshopID = $stateParams.webshopID;
		$scope.sells = [];
		$scope.webshop = {};
		$scope.admins = [];
		
		$http.get('/api/sells/' + $scope.webshopID)
			.success(function(data) {
				$scope.sells = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$http.get('/api/webshops/' + $scope.webshopID)
			.success(function(data) {
				$scope.webshop = data[0];
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		$http.get('/api/wsadmins/' + $scope.webshopID)
			.success(function(data) {
				$scope.admins = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
		$scope.registrateBuyer = function(fullname, username, phone, email, pass1, pass2) {
			if(pass1 != pass2) {
				alert("The two passwords aren't equal!");
				return;
			}
			console.log(fullname, username, md5.createHash(pass1), md5.createHash(pass2), email, phone);
			
			$http.get('/api/users/' + username)
				.success(function(data) {
					console.log(data);
					if(data.length != 0) {
						alert("This user already exists!");
						return;
					}
					
					var body = {fullname: fullname, username: username, password: md5.createHash(pass1), email: email, phone: phone, roleID: 3, webshopID: $scope.webshopID};
					$http.post('/api/users', body)
						.success(function(data) {
							console.log(data);
							alert("You registrated! Please login!");
						})
						.error(function(data) {
							console.log('Error: ' + data);
							alert("Sorry, something's wrong! Your account wasn't created.");
						});
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong!");
				});
		}
		
		$scope.loginBuyer = function(username, pass) {
			console.log(username, md5.createHash(pass));
			$http.get('/api/users/' + username)
				.success(function(data) {
					console.log(data);
					if(data.length == 0 || data[0].roleID != 3) {
						alert("Wrong username!");
						return;
					}
					if(data[0].password != md5.createHash(pass)) {
						alert("Wrong password!");
						return;
					}
					$cookies.put('userID', data[0].userID);
					$cookies.put('username', data[0].username);
					$state.go('webshops.home');
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong! Your login didn't succeed because of a server error.");
				});
		}
	}
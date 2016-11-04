function LoginAdminCtrl($scope, $http, md5, $cookies, $state) {

	$scope.loginAdmin = function(username, pass) {
			console.log(username, md5.createHash(pass));
			$http.get('/api/users/' + username)
				.success(function(data) {
					console.log(data);
					if(data.length == 0 || data[0].roleID == 3) {
						alert("Wrong username!");
						return;
					}
					if(data[0].password != md5.createHash(pass)) {
						alert("Wrong password!");
						return;
					}
					$cookies.put('userID', data[0].userID);
					$cookies.put('username', data[0].username);
					$state.go('admin.home');
				})
				.error(function(data) {
					console.log('Error: ' + data);
					alert("Sorry, something's wrong! Your login didn't succeed because of a server error.");
				});
	}
}
function WebshopRegistCtrl($scope, $http, md5) {

	// Registrate buyer to a webshop
	$scope.registrateBuyer = function(fullname, username, phone, email, pass1, pass2) {
		// if the two given passwords are not equal, then it returns and alerts user
		if(pass1 != pass2) {
			alert("The two passwords aren't equal!");
			return;
		}
			
		// if a user exists with the given username, then the account can't be created
		$http.get('/api/users/' + username)
			.success(function(data) {
				if(data.length != 0) {
					alert("This user already exists!");
					return;
				}
					
				// else, it creates the new buyer user
				var body = {fullname: fullname, username: username, password: md5.createHash(pass1), email: email, phone: phone, roleID: 3, webshopID: $scope.webshopUrl};
				$http.post('/api/users', body)
					.success(function(data) {
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
}
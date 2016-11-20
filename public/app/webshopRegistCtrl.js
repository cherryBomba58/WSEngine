function WebshopRegistCtrl($scope, $http, md5) {

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
					
				var body = {fullname: fullname, username: username, password: md5.createHash(pass1), email: email, phone: phone, roleID: 3, webshopID: $scope.webshopUrl};
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
}
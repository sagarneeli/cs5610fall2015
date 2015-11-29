(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("LoginController", ['$scope', '$location', '$rootScope', 'UserService', LoginController]);

	//HeaderController function
	function LoginController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;

		//Login Button navigating to #/profile
		$scope.login = function(){
			if ($scope.username && $scope.password){
				//Scope error make null
				$scope.error = null;
				/*UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(error, user){
					if (error){
						$scope.error = error;
					} else {
						//update rootscope user
						$rootScope.user = user;
						//broadcast login auth event for listeners to update loggedin user
						$rootScope.$broadcast('auth', user);
						//Navigate to profile
						$location.path( "/profile" );
					}
				});*/
				UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
				.then(function(user){
					//update rootscope user
					$scope.user = $rootScope.user = user;
					//broadcast login auth event for listeners to update loggedin user
					$rootScope.$broadcast('auth', user);
					//Navigate to profile
					$location.path( "/profile" );
				})
				.catch(function(error){
					$scope.error = error;
				})
			}
		};
	};

})();

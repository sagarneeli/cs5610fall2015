(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("HeaderController", ['$scope', '$location', '$rootScope', HeaderController]);

	//HeaderController function
	function HeaderController($scope, $location, $rootScope){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.user = $rootScope.user = user;
		});

		$scope.logout = function(){
			$scope.user = $rootScope.user = null;
			//Navigate to home
			$location.path( "/home" );
		};

	};

})();

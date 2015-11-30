(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $location, $rootScope)
  {
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.isLogin = isLogin;
    $scope.logout = logout;

    function isLogin() {
      if($rootScope.loggedInUser == null) {
        return true;
      }
      else {
        var loggedInUserName = $rootScope.loggedInUser.username;
        $scope.username = loggedInUserName[0].toUpperCase() + loggedInUserName.slice(1);
      }
    }

    function logout() {
      $scope.user = $rootScope.loggedInUser = null;
      $location.url( "/home" );
    }

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });
  }
})();

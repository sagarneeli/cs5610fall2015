'use strict';

(function() {
  angular
    .module("FormBuilderApp")
    .controller("LoginController", LoginController);

  function LoginController(UserService, $location, $rootScope, $scope) {
    $scope.$location = $location;
    $scope.login = login;

    function login() {
      if ($scope.username && $scope.password){
        UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
          .then(function (user) {
              $scope.user = $rootScope.loggedInUser = user;
              $rootScope.$broadcast('auth', user);
              $location.url('/profile');
          });
      }
    }
  }
})();

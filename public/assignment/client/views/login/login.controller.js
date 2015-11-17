(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("LoginController", LoginController);

  function LoginController(UserService, $location, $rootScope, $scope)
  {
    console.log("Attempting to login");
    $scope.$location = $location;

    $scope.login = function () {
      console.log("Given username " + $scope.user.username + " Given password " + $scope.user.password);
      UserService.findUserByUsernameAndPassword($scope.user.username, $scope.user.password)
        .then(function (user) {
          if (user != null) {
            $rootScope.loggedInUser = user;
            $location.url('/profile');
          }
        });
    };
  }
})();

(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("LoginController", LoginController);

  function LoginController(UserService, $location, $rootScope, $scope)
  {
    console.log("Attempting to login");
    var model = this;
    $scope.$location = $location;

    model.login = function (user) {
      console.log("Given username " + user.username + " Given password " + user.password);
      UserService.findUserByUsernameAndPassword(user.username, user.password)
        .then(function (user) {
          if (user != null) {
            $rootScope.loggedInUser = user;
            //$rootScope.$broadcast('auth', user);
            $location.url('/profile');
          }
        });
    };
  }
})();

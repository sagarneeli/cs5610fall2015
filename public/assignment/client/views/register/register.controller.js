'use strict';

(function() {
  angular
    .module("FormBuilderApp")
    .controller("RegisterController", RegisterController);

  function RegisterController(UserService, $location, $rootScope, $scope) {
    $scope.$location = $location;
    $scope.register = register;

    function register() {
      $scope.error = null;
      if ($scope.username && $scope.password && $scope.vpassword && $scope.email) {
        UserService.findAllUsers()
          .then(function(users){
            if ($scope.password === $scope.vpassword){
              var isUserPresent = false;
              var isEmailExists = false;
              for (var x = 0; x < users.length; x++) {
                var user = users[x];
                if (user && user.username === $scope.username && user.password === $scope.password)
                  isUserPresent = true;
                if (user && user.email === $scope.email)
                  isEmailExists = true;
              }
              if (isEmailExists && isUserPresent) {
                $scope.error = "User already isUserPresent with that email + username";
              } else if (isUserPresent) {
                $scope.error = "User already isUserPresent with that username";
              } else if (isEmailExists) {
                $scope.error = "User already isUserPresent with that email";
              } else {
                var newUser = {
                  username: $scope.username,
                  password: $scope.password,
                  email: $scope.email
                };
                UserService.createUser(newUser)
                  .then(function (user) {
                    $rootScope.loggedInUser = user;
                    $rootScope.$broadcast('auth', user);
                    $location.url('/profile');
                  });
              }
            }
          });
      }
    }
  };
})();

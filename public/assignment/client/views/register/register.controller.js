// Code for directive taken from this http://plnkr.co/edit/FipgiTUaaymm5Mk6HIfn

(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .directive("compareTo", compareTo)
    .controller("RegisterController", RegisterController);

  function RegisterController(UserService, $location, $rootScope, $scope)
  {
    $scope.$location = $location;
    //$scope.register = register;
    var model = this;

    model.register = function(user) {
      if ($scope.userForm.$valid) {
        var isUserPresent = false;
        var isEmailExists = false;

        console.log("In Register function");

        UserService.findAllUsers().then(function(users){
          for (var x = 0; x < users.length; x++) {
            var isUser = users[x];
            if (isUser && isUser.username === user.username && isUser.password === user.password){
              isUserPresent = true;
            }
            if (isUser && isUser.email === user.email){
              isEmailExists = true;
            }
          }
          console.log("Finding all users");
          if (isUserPresent && isEmailExists) {
            console.log("User already present, enter different user name and email id");
          }
          else {

            var newUser = {
              username : user.username,
              password : user.password,
              email : user.email
            };

            console.log("Creating new user " + newUser.username + " " + newUser.password);
            UserService.createUser(newUser)
              .then(function (user) {
                if (user == null) {
                  return;
                }
                console.log("Creating user");
                $rootScope.loggedInUser = user;
                //$rootScope.$broadcast('auth', user);
                $location.url('/profile');
              });
          }
        });
      }
    };
  }

  function compareTo() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };
        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  }
})();

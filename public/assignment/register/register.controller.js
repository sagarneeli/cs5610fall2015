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

        $scope.register = function register() {
            if ($scope.userForm.$valid) {
                var newUser = {
                    username : $scope.user.username,
                    password : $scope.user.password,
                    email : $scope.user.email
                };

                UserService.createUser(newUser, function (user) {
                    //console.log("New User " + user);
                    if (user == null) {
                        return;
                    }
                    $rootScope.loggedInUser = user;
                    $rootScope.$broadcast('auth', user);
                    $location.path('/profile');
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
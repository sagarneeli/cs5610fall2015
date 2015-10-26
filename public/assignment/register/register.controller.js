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
        $scope.register = register;

        function register() {
            if ($scope.userForm.$valid) {
                var isUserPresent = false;
                var isEmailExists = false;

                UserService.findAllUsers(function(users){
                    for (var x = 0; x < users.length; x++) {
                        var user = users[x];
                        if (user && user.username===$scope.user.username && user.password===$scope.user.password){
                            isUserPresent = true;
                        }
                        if (user && user.email === $scope.user.email){
                            isEmailExists = true;
                        }
                    }

                    if (isUserPresent && isEmailExists) {
                        console.log("User already present, enter different user name and email id");
                    }
                    else {
                        var newUser = {
                            username : $scope.user.username,
                            password : $scope.user.password,
                            email : $scope.user.email
                        };

                        UserService.createUser(newUser, function (user) {
                            if (user == null) {
                                return;
                            }
                            $rootScope.loggedInUser = user;
                            $rootScope.$broadcast('Auth', user);
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
(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope, $scope)
    {
        $scope.register = function register() {
            $scope.$location = $location;
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
                $location.url('/profile');
            });
        };
    }
})();
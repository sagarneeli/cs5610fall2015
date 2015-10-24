(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    //LoginController.$inject = ['UserService', '$location', '$rootScope'];

    function LoginController(UserService, $location, $rootScope, $scope)
    {
        console.log("Attempting to login");
        $scope.location = $location;

        $scope.login = function () {
            UserService.findUserByUsernameAndPassword($scope.user.username, $scope.user.password, function (user) {
                $rootScope.loggedInUser = user;
                $location.url('/profile');
            });
        };
    }
})();
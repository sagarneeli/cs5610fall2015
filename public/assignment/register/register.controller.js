(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope, $scope)
    {
        $scope.register = function register() {
            $scope.$location = $location;
            $scope.user = {};
            UserService.createUser($scope.user, function (newUser) {
                $rootScope.loggedInUser = newUser;
                $location.url('/profile');
            });
        };
    }
})();
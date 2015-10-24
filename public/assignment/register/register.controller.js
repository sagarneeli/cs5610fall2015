(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope, $scope)
    {
        $scope.register = function register() {
            $scope.user = {};
            UserService.createUser($scope.user, function (newUser) {
                $rootScope.loggedInUser = newUser;
                $location.path('/profile');
            });
        };

        //(function initController() {
        //    // reset login status
        //    AuthenticationService.ClearCredentials();
        //})();

    }
})();
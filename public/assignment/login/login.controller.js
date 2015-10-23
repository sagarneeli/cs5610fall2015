(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

    function LoginController(UserService, $location, $rootScope, $scope)
    {
        $scope.login = login;

        //(function initController() {
        //    // reset login status
        //    AuthenticationService.ClearCredentials();
        //})();

        function login() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function (response) {
                if (response.success) {
                    $rootScope.loggedInUser = $scope.username;
                    $location.path('/profile');
                }
            });
        };
    }
})();
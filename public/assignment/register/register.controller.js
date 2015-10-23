(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

    function RegisterController(UserService, $location, $rootScope, $scope)
    {
        $scope.register = register;

        //(function initController() {
        //    // reset login status
        //    AuthenticationService.ClearCredentials();
        //})();

        function register() {
            var user = {username: $scope.username, password: $scope.password};
            UserService.create($scope.username, $scope.password, function (response) {
                    $rootScope.loggedInUser = response.success;
                    $location.path('/profile');
            });
        };
    }
})();
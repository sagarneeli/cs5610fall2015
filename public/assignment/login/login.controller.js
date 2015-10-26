(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    //LoginController.$inject = ['UserService', '$location', '$rootScope'];

    function LoginController(UserService, $location, $rootScope, $scope)
    {
        console.log("Attempting to login");
        $scope.$location = $location;

        $scope.login = function () {
            console.log("Given username " + $scope.user.username + " Given password " + $scope.user.password);
            UserService.findUserByUsernameAndPassword($scope.user.username, $scope.user.password, function (user) {
                //if (user != null) {
                    $rootScope.loggedInUser = user;
                    $rootScope.$broadcast('Auth', user);
                    $location.url('/profile');
                //}
            });
        };
    }
})();
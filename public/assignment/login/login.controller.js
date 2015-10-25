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
                if (user != null) {
                    //user = {
                    //    username : $scope.user.username,
                    //    password : $scope.user.password
                    //};
                    console.log("Current User " + user);
                    $rootScope.loggedInUser = user;
                    $rootScope.$broadcast('auth', user);
                    $location.path('/profile');
                }
            });
        };
    }
})();
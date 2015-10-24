(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope, $scope)
    {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;

        $scope.update = function () {
            UserService.updateUser($scope.user.id, $scope.user, function (updatedUser) {
                $scope.user = updatedUser;
            });
        };

        //$scope.location = $location;
        //(function initController() {
        //    // reset login status
        //    AuthenticationService.ClearCredentials();
        //})();

    }
})();
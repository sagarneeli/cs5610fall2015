(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope, $scope)
    {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;

        $rootScope.$on("Auth", function(event, user){
            $scope.user = $rootScope.loggedInUser = user;
        });

        $scope.update = function () {
            UserService.updateUser($scope.user.id, $scope.user, function (updatedUser) {
                $rootScope.loggedInUser = updatedUser;
            });
        };
    }
})();
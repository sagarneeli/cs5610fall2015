(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope, $scope)
    {
        $scope.$location = $location;
        var user = $rootScope.loggedInUser;

        $rootScope.$on("auth", function(event, user){
            $scope.user = $rootScope.loggedInUser = user;
        });

        //$scope.user = user;

        $scope.update = function () {
            UserService.updateUser(user.id, user, function (updatedUser) {
                $rootScope.loggedInUser = updatedUser;
            });
        };
    }
})();
(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope, $scope)
    {
        $scope.$location = $location;
        var user = $rootScope.loggedInUser;

        //if (user == null) {
        //    return;
        //} else {
        //    if (user.username) {
        //        $scope.user.username = user.username;
        //    }
        //    if (user.password) {
        //        $scope.user.password = user.password;
        //    }
        //    if (user.firstName) {
        //        $scope.user.firstName = user.firstName;
        //    }
        //    if (user.lastName) {
        //        $scope.user.lastName = user.lastName;
        //    }
        //    if (user.email) {
        //        $scope.user.email = user.email;
        //    }
        //}

        $scope.user = user;

        $scope.update = function () {

            //if ($scope.user.username) {
            //    user.username = $scope.user.username;
            //}
            //if ($scope.user.password) {
            //    user.password = $scope.user.password;
            //}
            //if ($scope.user.firstName) {
            //    user.firstName = $scope.user.firstName;
            //}
            //if ($scope.user.lastName) {
            //    user.lastName = $scope.user.lastName;
            //}
            //if ($scope.user.email) {
            //    user.email = $scope.user.email;
            //}

            UserService.updateUser(user.id, user, function (updatedUser) {
                $rootScope.loggedInUser = updatedUser;
            });
        };
    }
})();
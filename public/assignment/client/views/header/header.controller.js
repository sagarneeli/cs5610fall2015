(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope)
    {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;

        $scope.logout = function(){
            $scope.user = $rootScope.loggedInUser = null;
            $location.url( "/home" );
        };
    }
})();

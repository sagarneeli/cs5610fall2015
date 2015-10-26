(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope)
    {
        $scope.$location = $location;
        //console.log($location.url());
        //
        //$scope.user = $rootScope.loggedInUser;
        //
        //$rootScope.$on("auth", function(event, user){
        //    $scope.user = $rootScope.loggedInUser = user;
        //});

        //$rootScope.loggedInUser = user;
        //$rootScope.$broadcast('auth', user);
    }
})();
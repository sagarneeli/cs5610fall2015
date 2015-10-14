(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location)
    {
        $scope.$location = $location;
        console.log($location.url());
    }
})();
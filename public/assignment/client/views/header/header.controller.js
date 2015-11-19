(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $location, $rootScope)
  {
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });

    $scope.logout = function() {
      $scope.user = $rootScope.loggedInUser = null;
      $location.url( "/home" );
    };
  }
})();

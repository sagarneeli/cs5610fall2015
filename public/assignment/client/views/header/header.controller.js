(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $location, $rootScope)
  {
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.logout = logout;

    function logout() {
      $scope.user = $rootScope.loggedInUser = null;
      $location.url( "/home" );
    }

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });
  }
})();

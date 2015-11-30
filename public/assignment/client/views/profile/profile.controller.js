'use strict';

(function() {
  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController(UserService, $location, $rootScope, $scope)
  {
    var user = $rootScope.loggedInUser;
    $scope.$location = $location;
    $scope.user = user;
    $scope.update = update;

    function update() {
      UserService.updateUser($scope.user.id, $scope.user)
        .then(function (updatedUser) {
          $scope.user = updatedUser;
        });
    }

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });
  }
})();

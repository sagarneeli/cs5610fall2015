(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController(UserService, $location, $rootScope, $scope)
  {
    var user = $rootScope.loggedInUser;
    $scope.$location = $location;
    $scope.user = user;

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });

    $scope.update = function () {
      UserService.updateUser($scope.user.id, $scope.user)
        .then(function (updatedUser) {
          for(var index in updatedUser) {
            $scope.user[index] = updatedUser[index];
          }
        });
    };
  }
})();

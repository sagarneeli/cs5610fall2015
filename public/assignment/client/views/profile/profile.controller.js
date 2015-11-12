(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController(UserService, $location, $rootScope, $scope)
  {
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;

    function filter(users) {
      var userId = $scope.user.id;
      for (var i = 0; i < users.length; ++i) {
        var user = users[i];
        if (user.id == userId)
          return user;
      }
      return null;
    }

    $scope.update = function () {
      UserService.updateUser($scope.user.id, $scope.user)
        .then(function (updatedUser) {
          $rootScope.loggedInUser = filter(updatedUser);
        });
    };
  }
})();

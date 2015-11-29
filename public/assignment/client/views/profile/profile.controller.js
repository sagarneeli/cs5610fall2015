(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController(UserService, $location, $rootScope, $scope)
  {
    var model = this;
    $scope.$location = $location;
    model.user = $rootScope.loggedInUser;;

    //$rootScope.$on("auth", function(event, user){
    //  $scope.user = $rootScope.loggedInUser = user;
    //});

    model.update = function (user) {
      UserService.updateUser(user.id, user)
        .then(function (response) {
          UserService.findUserByUsernameAndPassword(user.username, user.password)
            .then(function (updatedUser) {
              $rootScope.loggedInUser = updatedUser;
              model.user = updatedUser;
            });
        });
    };
  }
})();

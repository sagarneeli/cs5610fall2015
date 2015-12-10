'use strict';

(function() {
  angular
    .module("AniTheme")
    .factory("UserService", UserService);

  function UserService($http, $q)
  {
    var userService = {
      findProfileImage : findProfileImage,
    };

    return userService;

    function findProfileImage() {
      var deferred = $q.defer();
      $http.get('/account')
        .success(function(user) {
          deferred.resolve(user);
        });
      return deferred.promise;
    }
  }
})();

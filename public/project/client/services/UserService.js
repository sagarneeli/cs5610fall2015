'use strict';

(function() {
  angular
    .module("AniTheme")
    .factory("UserService", UserService);

  function UserService($http, $q)
  {
    var userService = {
      findProfileImage : findProfileImage,
      findPubnub : findPubnub
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

    function findPubnub() {
      var deferred = $q.defer();
      $http.get('/stream')
        .success(function(user) {
          deferred.resolve(user);
        });
      return deferred.promise;
    }
  }
})();

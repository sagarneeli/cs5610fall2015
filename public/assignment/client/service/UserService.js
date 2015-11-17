(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .factory("UserService", UserService);

  function UserService($http, $q)
  {
    var userService = {
      findUserByUsernameAndPassword : findUserByUsernameAndPassword,
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return userService;


    function findUserByUsernameAndPassword(username, password) {
      var deferred = $q.defer();
      var url = '/api/assignment/user?username=' + username + "&password=" + password;
      $http.get(url)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }


    function findAllUsers()
    {
      var url = '/api/assignment/user';
      var deferred = $q.defer();
      $http.get(url)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }


    function createUser(user) {
      var url = '/api/assignment/user';
      var deferred = $q.defer();
      $http.post(url, user)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function deleteUserById(userId) {
      var url = '/api/assignment/user/' + userId;
      var deferred = $q.defer();
      $http.delete(url)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }


    function updateUser(userId, user) {
      var url = '/api/assignment/user/' + userId;
      var deferred = $q.defer();
      $http.put(url, user)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }
  }
})();

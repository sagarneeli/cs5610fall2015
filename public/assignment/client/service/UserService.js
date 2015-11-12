(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .factory("UserService", UserService);

  function UserService($http, $q)
  {
    //var users = [];

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
      var request = {
        method: 'POST',
        url: '/api/assignment/user',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      };
      var deferred = $q.defer();
      $http(request)
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
      var request = {
        method:'PUT',
        url:'/api/assignment/user/' + userId,
        headers:{
          'Content-Type':'application/json'
        },
        data:user
      };
      var deferred = $q.defer();
      $http(request)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }
  }
})();

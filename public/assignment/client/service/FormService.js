(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q)
    {
        //var forms = [];

        var formService = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return formService;

        function createFormForUser(userId, form) {
          var request = {
            method: 'POST',
            url: '/api/assignment/user/' + userId + '/form',
            headers: {
              'Content-Type': 'application/json'
            },
            data: form
          };
          var deferred = $q.defer();
          $http(request)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function findAllFormsForUser(userId) {
          var request = {
            method: 'GET',
            url: '/api/assignment/user/' + userId + '/form',
            headers: {
              'Content-Type': 'application/json'
            }
          };
          var deferred = $q.defer();
          $http(request)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function deleteFormById(formId, callback) {
          var url = '/api/assignment/form/' + formId;
          var deferred = $q.defer();
          $http.delete(url)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function updateFormById(formId, newForm, callback) {
          var request = {
            method: 'PUT',
            url: '/api/assignment/form/' + formId,
            headers: {
              'Content-Type': 'application/json'
            },
            data: newForm
          };
          $http(request)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }
    }
})();

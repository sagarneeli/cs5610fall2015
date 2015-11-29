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
            updateFormById : updateFormById,
            findForm : findForm
        };

        return formService;

        function createFormForUser(userId, form) {
          var url = '/api/assignment/user/' + userId + '/form';
          var deferred = $q.defer();
          $http.post(url, form)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function findAllFormsForUser(userId) {
          var url = '/api/assignment/user/' + userId + '/form';
          var deferred = $q.defer();
          $http.get(url)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function deleteFormById(formId) {
          var url = '/api/assignment/form/' + formId;
          var deferred = $q.defer();
          $http.delete(url)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }


        function updateFormById(formId, newForm) {
          var url = '/api/assignment/form/' + formId;
          $http.put(url, newForm)
            .success(function(response) {
              deferred.resolve(response);
            });
          return deferred.promise;
        }

        function findForm(formId) {
          var deferred = $q.defer();
          var url = "/api/assignment/form/" + formId;
          $http.get(url)
            .success(function (response) {
              deferred.resolve(response);
            });

          return deferred.promise;
        };

    }
})();

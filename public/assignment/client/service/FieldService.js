(function(){
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular.module("FormBuilderApp").factory('FieldService', ['$window', '$http', '$q', '$rootScope', FieldService]);

  //UserService  function
  function FieldService($http, $q) {
    var createFieldForForm = function (formId, field) {
      var deferred = $q.defer();

      $http.post("/api/assignment/form/" + formId + "/field", field)
        .success(function (fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    };

    var getFieldsForFormAndUser = function (formId, userId) {
      var deferred = $q.defer();

      $http.get("/api/assignment/user/" + userId + "/form/" + formId + "/field")
        .success(function (fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    };

    var getFieldsForForm = function (formId) {
      var deferred = $q.defer();

      $http.get("/api/assignment/form/" + formId + "/field")
        .success(function (fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    };
    var getFieldForForm = function (formId, fieldId) {
      var deferred = $q.defer();

      $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
        .success(function (field) {
          deferred.resolve(field);
        });

      return deferred.promise;
    };
    var deleteFieldFromForm = function (formId, fieldId) {
      var deferred = $q.defer();
      $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
        .success(function (fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    };
    var updateField = function (formId, fieldId, field) {
      var deferred = $q.defer();

      $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
        .success(function (fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    };

    var service = {
      createFieldForForm: createFieldForForm,
      getFieldsForForm: getFieldsForForm,
      getFieldsForFormAndUser: getFieldsForFormAndUser,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      updateField: updateField
    };
    return service;
  };

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

})();

'use strict';

(function(){
  angular
    .module("FormBuilderApp")
    .factory('FieldService', FieldService);

  function FieldService ($http, $q) {
    var fieldService = {
      "createFieldForForm": createFieldForForm,
      "getFieldsForForm": getFieldsForForm,
      "getFieldForForm": getFieldForForm,
      "deleteFieldFromForm": deleteFieldFromForm,
      "updateField": updateField,
      "cloneField": cloneField
    };

    return fieldService;

    function createFieldForForm(formId, field) {
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field";
      $http.post(url, field)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function getFieldsForForm(formId) {
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field";
      $http.get(url)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function getFieldForForm(formId, fieldId){
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
      $http.get(url)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId){
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
      $http.delete(url)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function updateField(formId, fieldId, field){
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
      $http.put(url, field)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function cloneField(clonedField, index, formId){
      var deferred = $q.defer();
      var url = "/api/assignment/form/" + formId + "/field/" + index;
      $http.post(url, clonedField)
        .success(function(response){
          deferred.resolve(response);
        });
      return deferred.promise;
    }
  };
})();

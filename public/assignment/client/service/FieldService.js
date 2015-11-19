(function () {
  angular
    .module("FormBuilderApp")
    .factory("FieldService", FieldService);

  function FieldService($http, $q)
  {
    var api = {
      createFieldForForm: createFieldForForm,
      getFieldsForForm: getFieldsForForm,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      updateField: updateField
    };
    return api;

    function createFieldForForm(formId, field) {
      var deferred = $q.defer();
      var url = '/api/assignment/form/' + formId + '/field';
      $http.post(url, field)
        .success(function(fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    }

    function getFieldsForForm(formId) {
      var deferred = $q.defer();
      var url = '/api/assignment/form/' + formId + '/field';
      $http.get(url)
        .success(function(fields) {
          deferred.resolve(fields);
        });

      return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
      var deferred = $q.defer();
      var url = '/api/assignment/form/' + formId + '/field/' + fieldId;
      $http.get(url, fieldId)
        .success(function(field) {
          deferred.resolve(field);
        });

      return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
      var deferred = $q.defer();
      var url = '/api/assignment/form/' + formId + '/field/' + fieldId;
      $http.delete(url)
        .success(function(field) {
          deferred.resolve(field);
        });
      return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
      var deferred = $q.defer();
      var url = '/api/assignment/form/' + formId + '/field/' + fieldId;
      $http.put(url, field)
        .success(function(field) {
          deferred.resolve(field);
        });

      return deferred.promise;
    }
  }
})();

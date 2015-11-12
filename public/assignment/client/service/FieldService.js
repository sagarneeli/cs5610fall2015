(function () {
  angular
    .module("FormBuilderAppNew")
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
      var request = {
        method: 'POST',
        url: '/api/assignment/form/' + formId + '/field',
        headers: {
          'Content-Type': 'application/json'
        },
        data: field
      };
      $http(request)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    }

    function getFieldsForForm(formId) {
      var deferred = $q.defer();
      var request = {
        method: 'GET',
        url: '/api/assignment/form/' + formId + '/field',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log(request);
      $http(request)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
      var deferred = $q.defer();
      var request = {
        method: 'GET',
        url: '/api/assignment/form/' + formId + '/field/' + fieldId,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      $http(request)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
      var deferred = $q.defer();
      var request = {
        method: 'DELETE',
        url: '/api/assignment/form/' + formId + '/field/' + fieldId,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      $http(request)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
      var deferred = $q.defer();
      var request = {
        method: 'PUT',
        url: '/api/assignment/form/' + formId + '/field/' + fieldId,
        headers: {
          'Content-Type': 'application/json'
        },
        data: field
      };
      $http(request)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    }
  }
})();

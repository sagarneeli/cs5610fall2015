(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController(FormService, $rootScope, $scope)
  {
    var user = $rootScope.loggedInUser;
    $scope.newForm = {};
    $scope.user = user

    function filter(data) {
      var result =  data.filter(function (form) {
        return form.userId == $rootScope.user.id;
      });
      console.log(result);
      return result;
    }

    function init() {
      if (user == null) {
        user = {
          id: '12345'
        };
      }
      FormService.findAllFormsForUser(user.id)
        .then(function (forms) {
          $scope.forms = filter(forms);
        });
    }

    init();

    $scope.addForm = function() {
      FormService.createFormForUser($scope.user.id, $scope.newForm)
        .then(function(form) {
          $scope.forms = filter(form);
          $scope.newForm = {};
        });
    }

    $scope.updateForm = function() {
      if ($scope.selectedForm) {
        FormService.updateFormById($scope.selectedForm.id, $scope.newForm)
          .then(function(form) {
            $scope.selectedForm.name = $scope.newForm.name
            $scope.forms = filter(form);
          });
      }
    }

    $scope.deleteForm = function(index) {
      FormService.deleteFormById($scope.forms[index].id)
        .then(function(form){
          $scope.forms = filter(form);
        });
    }

    $scope.selectForm = function(index) {
      $scope.selectedForm = $scope.forms[index];
      $scope.newForm.name = $scope.selectedForm.name;
    }

  }
})();

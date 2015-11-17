(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController(FormService, $rootScope, $scope)
  {
    var user = $rootScope.loggedInUser;
    $scope.newForm = {};
    $scope.user = user;

    function init() {
      //if (user == null) {
      //  user = {
      //    id: '12345'
      //  };
      //}
      FormService.findAllFormsForUser(user.id)
        .then(function (forms) {
          $scope.forms = forms;
        });
    }

    init();

    $scope.addForm = function() {
      FormService.createFormForUser(user.id, $scope.newForm)
        .then(function(form) {
          $scope.forms = form;
          //$scope.newForm = {};
        });
    }

    $scope.updateForm = function() {
      if ($scope.selectedForm) {
        FormService.updateFormById($scope.selectedForm.id, $scope.newForm)
          .then(function(form) {
            $scope.selectedForm.name = $scope.newForm.name;
            $scope.forms = form;
          });
      }
    }

    $scope.deleteForm = function(index) {
      FormService.deleteFormById($scope.forms[index].id)
        .then(function(form){
          $scope.forms = form;
        });
    }

    $scope.selectForm = function(index) {
      $scope.selectedForm = $scope.forms[index];
      $scope.newForm.name = $scope.selectedForm.name;
    }

  }
})();

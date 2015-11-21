(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController(FormService, $rootScope, $scope, $location)
  {
    var user = $rootScope.loggedInUser;
    $scope.user = user;

    function init() {
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function (forms) {
            $scope.forms = forms;
          });
      }
    }

    init();

    $scope.addForm = function(formName) {
      var _this = this;
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(forms) {
            $scope.forms = forms;
            var exists = false;
            for (var index = 0; index < forms.length; index++) {
              var form = forms[index];
              if (form.title == formName) {
                //break;
                exists = true;
              }
            }
            if (!exists){
              var newForm = {
                title : formName
              };
              FormService.createFormForUser($scope.user.id, newForm)
                .then(function(form) {
                  console.log(forms);
                  $scope.forms.push(form);
                  //$scope.newForm = {};
                  formName = _this.formName = "";
                });
            }
          });
      }
    };

    $scope.updateForm = function(formName) {
      if ($scope.updateForm) {
        $scope.updateForm.title = formName;
        FormService.updateFormById($scope.updateForm.id, $scope.updateForm)
          .then(function(form) {
            $scope.updateForm = null;
            $scope.forms = form;
          });
      }
    };

    $scope.deleteForm = function(id) {
      FormService.deleteFormById(id)
        .then(function(form){
          $scope.forms = form;
        });
    };

    $scope.formFields = function(form){
      $scope.selectedForm = $rootScope.selectedForm = form;
      $rootScope.$broadcast('selectedForm', form);
      console.log("User ID" + $scope.user.id);
      $location.path("/user/" + $scope.user.id + "/form/" + form.id + "/fields");
    };

    $scope.selectForm = function(currentForm) {
      $scope.updateForm = null;
      for (var i = 0; i < $scope.forms.length; i++) {
        var form = $scope.forms[i];
        var selectedForm;
        if (form.title == currentForm.title) {
          selectedForm = form;
        }
      }
      if (selectedForm) {
        $scope.updateForm = selectedForm;
      }
    };

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(userForms){
            $scope.forms = userForms;
          })
      }
    });

  }
})();

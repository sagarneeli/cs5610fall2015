'use strict';

(function(){
  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController(FormService, $rootScope, $scope, $location) {
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.addForm = addForm;
    $scope.updateForm = updateForm;
    $scope.deleteForm = deleteForm;
    $scope.formFields = formFields;
    $scope.selectForm = selectForm;

    var init = function() {
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function (forms) {
            $scope.forms = forms;
          });
      }
    }
    init();

    function addForm(formName) {
      var initForm = this;
      if (!formName) {
        $scope.error = "Please provide the form name";
      } else if ($scope.user) {
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(forms){
            $scope.forms = forms;
            var exists = false;
            for (var index = 0; index < forms.length; index++) {
              var form = forms[index];
              if (form.title == formName) {
                exists = true;
              }
            }
            if (!exists) {
              var newForm = {
                title: formName
              };
              FormService.createFormForUser($scope.user.id, newForm)
                .then(function(form) {
                  $scope.forms.push(form);
                  formName = initForm.formName = "";
                });
            }
          });
      } else {
        $scope.error = "Please login to add a new form";
      }
    };

    function updateForm(formName) {
      if (!formName){
        $scope.formToUpdate = null;
      } else {
        if ($scope.formToUpdate) {
          $scope.formToUpdate.title = formName;
          FormService.updateFormById($scope.formToUpdate.id, $scope.formToUpdate)
            .then(function(form){
              $scope.formToUpdate = null;
            });
        }
      }
    };

    function deleteForm(formId) {
      FormService.deleteFormById(formId)
        .then(function(forms){
          $scope.forms = forms;
        });
    };

    function formFields(form) {
      $scope.selectedForm = $rootScope.selectedForm = form;
      var url = "/user/" + $scope.user.id + "/form/" + form.id + "/fields";
      $location.path(url);
      $rootScope.$broadcast('selectedForm', form);
    };

    function selectForm(currentForm) {
      $scope.formToUpdate = null;
      if (currentForm){
        var selectedForm;
        for (var i = 0; i < $scope.forms.length; i++) {
          var form = $scope.forms[i];
          if (form.title == currentForm.title) {
            selectedForm = form;
          }
        }
        if (selectedForm){
          var inputElement = document.getElementById("title");
          inputElement.value = selectedForm.title;
          $scope.formToUpdate = selectedForm;
        }
      }
    };

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
      init();
    });

  };

})();

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
    $scope.gotoFormFields = gotoFormFields;
    $scope.selectForm = selectForm;

    var initForms = function(){
      $scope.error = $scope.success = "";
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(forms) {
            $scope.forms = forms;
          });
      }
    };
    initForms();

    function addForm(formName){
      $scope.error = $scope.success = "";
      var _this = this;
      $scope.error = null;
      if (!formName){
        $scope.error = "Please provide the form name";
      } else if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(userForms){
            $scope.forms = userForms;
            var exists = false;
            userForms.forEach(function(form, index){
              if (form.title === formName) {
                exists = true;
              }
            });
            if (exists) {
              $scope.error = "The entered form name for given user already exists. Please enter a different name";
            } else {
              var newFormObject = {
                title: formName
              }
              FormService.createFormForUser($scope.user.id, newFormObject)
                .then(function(newlyCreatedForm) {
                  $scope.forms.push(newlyCreatedForm);
                  formName = _this.formName = "";
                });
            }
          });
      } else {
        $scope.error = "Please login to add a new form";
      }
    };



    function updateForm(formName) {
      $scope.error = $scope.success = "";
      var inputElement = document.getElementById("searchName");
      formName = inputElement.value;
      if (typeof formName === "undefined" || !formName){
        $scope.error = "Please provide a formName";
        $scope.formToUpdate = null;
      } else {
        if ($scope.formToUpdate){
          $scope.formToUpdate.title = formName;
          FormService.updateFormById($scope.formToUpdate.id, $scope.formToUpdate)
            .then(function(updatedForm){
              $scope.success = "Form updated successfully";
              $scope.formToUpdate = null;
              inputElement.value = "";
            });
        } else {
          $scope.error = "Please select a form first";
        }
      }
    };



    function deleteForm(formId) {
      $scope.error = $scope.success = "";
      $scope.error = "";
      if (typeof formId === "undefined"){
        $scope.error = "Please provide an formId to delete";
      } else {
        FormService.deleteFormById(formId)
          .then(function(newFormList){
            $scope.forms = newFormList;
          });
      }
    };

    function selectForm(form) {
      $scope.error = $scope.success = "";
      var _this = this;
      $scope.formToUpdate = null;
      $scope.error = "";
      if (!form){
        $scope.error = "Please provide a form for selecting";
      } else {
        var selectedForm;
        $scope.forms.forEach(function(f, index){
          if (f.title == form.title){
            selectedForm = f;
          }
        });
        if (selectedForm){
          var inputElement = document.getElementById("searchName");
          inputElement.value = selectedForm.title;
          $scope.formToUpdate = selectedForm;
        } else {
          $scope.error = "no form found with name " + formName;
        }
      }
    };

    function gotoFormFields(form) {
      $scope.error = $scope.success = "";
      $scope.selectedForm = $rootScope.selectedForm = form;
      var target = "/user/"+$scope.user.id+"/form/"+form.id+"/fields";
      $location.path( target );
      $rootScope.$broadcast('selectedForm', form);
    };

    //listen for login/sigin to grab logged in user
    $rootScope.$on("auth", function(event, user){
      $scope.error = $scope.success = "";
      $scope.error = null;
      $scope.user = $rootScope.loggedInUser = user;
      if ($scope.user){
        FormService.findAllFormsForUser($scope.user.id)
          .then(function(userForms){
            $scope.forms = userForms;
          });
      }
    });

  };

})();

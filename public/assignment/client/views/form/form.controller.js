(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController(FormService, $rootScope, $scope, $location)
  {
    var model = this;
    var user = $rootScope.loggedInUser;
    $scope.user = user;

    function init() {
      if ($scope.user){
        FormService.findAllFormsForUser(user._id)
          .then(function (forms) {
            model.forms = forms;
          });
      }
    }

    init();

    model.addForm = function(newForm) {
      if ($scope.user){
        FormService.createFormForUser(user._id, newForm)
          .then(function(form) {
            console.log("added the respective form");
            init();
          });
      }
    };

    model.updateForm = function(updateForm) {
        FormService.updateFormById(model.selectedForm._id, updateForm)
          .then(function(response) {
            FormService.findForm(model.selectedForm._id)
              .then(function (form) {
                model.selectedForm = form;
              });
          });
    };

    model.deleteForm = function(form) {
      FormService.deleteFormById(form._id)
        .then(function(form){
          init();
        });
    };

    $scope.formFields = function(form){
      $scope.selectedForm = $rootScope.selectedForm = form;
      $rootScope.$broadcast('selectedForm', form);
      console.log("User ID" + $scope.user.id);
      $location.path("/user/" + $scope.user.id + "/form/" + form.id + "/fields");
    };

    model.selectForm = function(currentForm) {
      model.selectedForm = currentForm;
      model.form = form;
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

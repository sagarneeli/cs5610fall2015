'use strict';

(function() {
  angular
    .module("FormBuilderApp")
    .controller("FieldController",  FieldController);

  function FieldController($scope, $routeParams, $location, $rootScope, FieldService){
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.fields = [];
    $scope.newFieldType = "";
    $scope.formID = $routeParams.formId;
    $scope.userID = $routeParams.userId;
    $scope.newField = {
      "fieldType": $scope.newFieldType,
      "slt": {
        "label": "Text Field",
        "fieldType": "TEXT",
        "placeholder": "New Field"
      },
      "mltf": {
        "label": "Text Field",
        "fieldType": "TEXTAREA",
        "placeholder": "New Field"
      },
      "date": {
        "label": "Date Field",
        "fieldType": "DATE"
      },
      "dropdown": {
        "id": null,
        "label": "Dropdown",
        "fieldType": "OPTIONS",
        "options": [
          {"label": "Option 1", "value": "OPTION_1"},
          {"label": "Option 2", "value": "OPTION_2"},
          {"label": "Option 3", "value": "OPTION_3"}]
      },
      "checkboxes": {
        "label": "Checkboxes",
        "fieldType": "CHECKBOXES",
        "options": [
          {"label": "Option 1", "value": "OPTION_1"},
          {"label": "Option 2", "value": "OPTION_2"},
          {"label": "Option 3", "value": "OPTION_3"}]
      },
      "radio": {
        "label": "Radio Buttons",
        "fieldType": "RADIOS",
        "options": [
          {"label": "Option 1", "value": "OPTION_1"},
          {"label": "Option 2", "value": "OPTION_2"},
          {"label": "Option 3", "value": "OPTION_3"}]
      },
      "email": {
        "label": "Email Field",
        "fieldType": "EMAIL",
        "placeholder": "New Email Field"
      }
    };
    $scope.addField = addField;
    $scope.deleteField = deleteField;

    function init() {
      if ($scope.selectedForm) {
        FieldService.getFieldsForForm($scope.selectedForm.id)
          .then(function(fields){
            $scope.fields = fields;
          });
      }
    }
    init();

    function addField(fieldType) {
      if (fieldType){
        $scope.newField.fieldType = fieldType;
        var newFieldObject = $scope.newField[fieldType];
        $scope.fields.push(newFieldObject);
        FieldService.createFieldForForm($scope.selectedForm.id, newFieldObject)
          .then(function(fields){
            $scope.fields = fields;
          });
      }
    };

    function deleteField(field) {
      if (field){
        FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
          .then(function(fields) {
            $scope.fields = fields;
          });
      }
    }

    $rootScope.$on("auth", function(event, user){
      $scope.user = $rootScope.loggedInUser = user;
    });

    $rootScope.$on("selectedForm", function(event, form){
      $scope.selectedForm = $rootScope.selectedForm = form;
    });

    $scope.$on("$destroy", function() {
      $scope.selectedForm = $rootScope.selectedForm = null;
    });
  };
})();

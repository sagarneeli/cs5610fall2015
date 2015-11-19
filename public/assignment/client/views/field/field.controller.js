(function(){
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FieldController", FieldController);

  //FieldController function
  function FieldController($scope, $routeParams, $location, $rootScope, FormService, FieldService){
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.fields = [];
    $scope.newFieldType = "";
    $scope.formID = $routeParams.formId || "";
    $scope.userID = $routeParams.userId || "";

    console.log("Entered Profile");

    var options = {
      "label": "o1",
      "value": "o1"
    };

    var slt = {
        "id": null,
        "label": "New Text Field",
        "type": "TEXT",
        "placeholder": "New Field"
      },
      mltf = {
        "id": null,
        "label": "New Text Field",
        "type": "TEXTAREA",
        "placeholder": "New Field"
      },
      date = {
        "id": null,
        "label": "New Date Field",
        "type": "DATE"
      },
      dropdown = {
        "id": null,
        "label": "New Dropdown",
        "type": "OPTIONS",
        "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
      },
      checkboxes = {
        "id": null,
        "label": "New Checkboxes",
        "type": "CHECKBOXES",
        "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
      },
      radio = {
        "id": null,
        "label": "New Radio Buttons",
        "type": "RADIOS",
        "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
      },
      email = {
        "id": null,
        "label": "New Email Field",
        "type": "EMAIL",
        "placeholder": "New Email Field"
      };

    $scope.newField = {
      "type": $scope.newFieldType,
      "slt": clone(slt),
      "mltf": clone(mltf),
      "date": clone(date),
      "dropdown": clone(dropdown),
      "checkboxes": clone(checkboxes),
      "radio": clone(radio),
      "email": clone(email)
    };

    function clone(source){
      if (source && typeof source === "object"){
        return JSON.parse(JSON.stringify(source));
      } else {
        return null;
      }
    }

    var initForms = function(){
      if ($scope.selectedForm){
        FieldService.getFieldsForForm($scope.selectedForm.id)
          .then(function(fields){
            $scope.fields = fields;
            console.log($scope.userID + " fields console " + fields);
          })
          .catch(function(error){
            $scope.error = error;
          });
      }
    };
    initForms();

    /*$scope.newField = {
     "options": ["No Fields Selected","Single Line Text Field","Multi Line Text Field","Date Field",
     "Dropdown Field","Checkboxes Field", "Radio Buttons Field"]
     };*/

    $scope.addField = function(fieldType){
      $scope.error = "";
      if (fieldType){
        $scope.newField.type = fieldType;
        var newFieldObject = clone($scope.newField[fieldType]);
        $scope.fields.push(newFieldObject);

        FieldService.createFieldForForm($scope.selectedForm.id, newFieldObject)
          .then(function(fields){
            $scope.fields = fields;
          })
          .catch(function(error){
            $scope.error = error;
          });
      } else {
        $scope.error = "Please select a field type to add";
      }
    };

    $scope.deleteField = function(field){
      $scope.error = "";
      if (field){
        FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
          .then(function(remainingFields){
            $scope.fields = remainingFields;
          })
          .catch(function(error){
            $scope.error = error;
          });
      } else {
        $scope.error = "Please select a field type to delete";
      }
    };

    $scope.cloneField = function(field, index){
      var clonedField = clone(field);
      FieldService.cloneField(clonedField, index, $scope.selectedForm.id)
        .then(function(fields){
          $scope.fields = fields;
        })
        .catch(function(error){
          $scope.error = error;
        });
    }

    //listen for login/sigin to grab logged in user
    $rootScope.$on("auth", function(event, user){
      $scope.error = null;
      $scope.user = $rootScope.loggedInUser = user;
    });

    //listen for selectedForm to grab selectedFrom
    $rootScope.$on("selectedForm", function(event, form){
      $scope.error = null;
      $scope.selectedForm = $rootScope.selectedForm = form;
    });

    // On scope destroy, delete the selectedForm
    $scope.$on("$destroy", function() {
      $scope.selectedForm = $rootScope.selectedForm = null;
    });

  };

})();

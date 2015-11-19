(function(){
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("FieldController", FieldController);

  function FieldController($scope, $routeParams, $location, $rootScope, FieldService){
    $scope.$location = $location;
    $scope.user = $rootScope.loggedInUser;
    $scope.fields = [];
    $scope.newFieldType = "";
    $scope.formID = $routeParams.formId;
    $scope.userID = $routeParams.userId;


    function clone(source){
      if (source && typeof source === "object"){
        return JSON.parse(JSON.stringify(source));
      }
      return null;
    }

    var initForms = function(){
      if ($scope.selectedForm){
        FieldService.getFieldsForForm($scope.selectedForm.id)
          .then(function(fields){
            $scope.fields = fields;
          })
      }
    };
    initForms();


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
      }
    };

    $scope.removeField = function(field){
      $scope.error = "";
      if (field){
        FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
          .then(function(remainingFields){
            $scope.fields = remainingFields;
          })
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

    $rootScope.$on("auth", function(event, user){
      $scope.error = null;
      $scope.user = $rootScope.loggedInUser = user;
    });

    $rootScope.$on("selectedForm", function(event, form){
      $scope.error = null;
      $scope.selectedForm = $rootScope.selectedForm = form;
    });

    $scope.$on("$destroy", function() {
      $scope.selectedForm = $rootScope.selectedForm = null;
    });

  };

})();

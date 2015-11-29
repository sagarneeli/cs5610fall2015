(function(){
  'use strict';

  //Defining header controller
  angular
    .module("FormBuilderApp")
    .controller("FieldController", ['$scope', '$routeParams', '$location', '$rootScope', 'FormService', 'FieldService', FieldController]);

  //FieldController function
  function FieldController($routeParams, FieldService) {
    //Putting the userId in the url shouldn't be necessary since the form associated
    //with formId contains the userId of the person who's logged in.
    //The filtering (for forms that belong to the logged in user) is already done on the
    //form page/view/controller.
    var userId = $routeParams.userId;
    var formId = $routeParams.formId;
    var model = this;
    model.fieldType = "slt"; //Sets the default drop down value.

    FieldService
      .getFieldsForFormAndUser(formId, userId)
      .then(function (fields) {
        model.fields = fields;
      });

    model.addField = addField;
    model.removeField = removeField;

    function removeField(field) {
      FieldService
        .deleteFieldFromForm(formId, field._id)
        .then(function(fields){
          model.fields = fields;
        });
    };

    function addField(ft) {
      var field = {};
      switch (ft) {
        case "slt":
          field.label = "New Text Field";
          field.fieldType = "TEXT";
          field.placeholder = "New Field";
          break;
        case "date":
          field.label = "New Date Field";
          field.fieldType = "DATE";
          break;
        case "drdo":
          field.label = "New Dropdown";
          field.fieldType = "SELECT";
          field.options = [
            { "label": "Option 1", "value": "OPTION_1" },
            { "label": "Option 2", "value": "OPTION_2" },
            { "label": "Option 3", "value": "OPTION_3" }
          ];
          break;
        case "chbx":
          field.label = "New Checkboxes";
          field.fieldType = "CHECKBOXES";
          field.options = [
            { "label": "Option A", "value": "OPTION_A" },
            { "label": "Option B", "value": "OPTION_B" },
            { "label": "Option C", "value": "OPTION_C" }
          ];
          break;
        case "rdbu":
          field.label = "New Radio Buttons";
          field.fieldType = "RADIOS";
          field.options = [
            { "label": "Option X", "value": "OPTION_X" },
            { "label": "Option Y", "value": "OPTION_Y" },
            { "label": "Option Z", "value": "OPTION_Z" }
          ];
          break;
        case "mlt":
          field.label = "New Text Field";
          field.fieldType = "TEXTAREA";
          field.placeholder = "New Field";
          break;
        default:
          console.log("UNREACHABLE");
          console.log(ft);
      }
      FieldService
        .createFieldForForm(formId, field)
        .then(function(fields){
          model.fields = fields;
        });
    };
  };

})();

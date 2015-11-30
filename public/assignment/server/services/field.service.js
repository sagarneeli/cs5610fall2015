"use strict";
var mongoose = require("mongoose");

module.exports = function(app, formModel) {
	app.get("/api/assignment/form/:formId/field", function(req, res) {
    var formId = req.params.formId;
    formModel.findFormById(formId)
      .then(function(requiredForm) {
        requiredForm = requiredForm || {};
        var fields = requiredForm.fields || [];
        res.json(fields);
      });
  });

	app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    formModel.findFormById(formId)
      .then(function(requiredForm){
        requiredForm = requiredForm || {};
        var fields = requiredForm.fields || [];
        var requiredField;
        fields.forEach(function(field, index) {
          if (field.id.equals(fieldId)) {
            requiredField = field;
          }
        });
        if (requiredField) {
          res.json(fields);
        } else {
          res.status(400).send("There is no field with ID : " + fieldId);
        }
      });
  });

	app.delete("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
    var formId = req.params.formId, fieldId = req.params.fieldId;
    formModel.findFormById(formId)
      .then(function(requiredForm) {
        requiredForm = requiredForm || {};
        var fields = requiredForm.fields || [];
        fields.forEach(function(field, index) {
          if (field.id.equals(fieldId)) {
            fields.splice(index, 1);
          }
        });
        formModel.Update(formId, requiredForm)
          .then(function(form) {
            res.json(requiredForm.fields);
          });
      });
  });

	app.post("/api/assignment/form/:formId/field", 	function(req, res) {
    var field = req.body || {};
    field.id = field._id = mongoose.Types.ObjectId();
    var formId = req.params.formId;
    formModel.findFormById(formId)
      .then(function(requiredForm) {
        requiredForm = requiredForm || {};
        requiredForm.fields = requiredForm.fields || [];
        requiredForm.fields.push(field);
        formModel.Update(formId, requiredForm)
          .then(function(updatedForm) {
            var newFields = updatedForm.fields || [];
            res.json(newFields);
          });
      });
  });

	app.put("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
    var inputField = req.body || {};
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    formModel.findFormById(formId)
      .then(function(requiredForm) {
        requiredForm = requiredForm || {};
        var fields = requiredForm.fields || [];
        fields.forEach(function(field, index) {
          if (field.id.equals(fieldId)) {
            field = inputField;
          }
        });
        requiredForm.fields = fields || [];
        formModel.Update(formId, requiredForm)
          .then(function(form) {
            res.json(inputField);
          });
      });
  });
};

"use strict";

module.exports = function (app, model) {

  app.get('/api/assignment/form/:formId/field', function (req, res) {
    var formId = req.params.formId;
    res.json(model.FindById(formId).fields);
  });

  app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    model.FindById(formId)
      .then(function(form) {
        var fields = form.fields;
        for(var i = 0; i < fields.length; i++) {
          var field = fields[i];
          if(field.id == fieldId) {
            res.json(fields);
          }
        }
      });
  });

  app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    model.FindById(formId)
      .then(function(form) {
        var fields = form.fields;
        for(var i = 0; i < fields.length; i++) {
          var field = fields[i];
          if(field.id == fieldId) {
            fields.splice(index, 1);
          }
        }

        model.updateForm(formId, form)
          .then(function(form) {
            res.json(form.fields);
          });
      });
  });

  app.post('/api/assignment/form/:formId/field', function (req, res) {
    var formId = req.params.formId;
    var field = req.body;
    field.id = uuid.v1();
    model.FindById(formId)
      .then(function(form) {
        var fields = form.fields;
        fields.push(field);
        model.Update(formId, form)
          .then(function(updatedForm) {
            res.json(updatedForm.fields);
          });
      });
  });

  app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var updateField = req.body;
    model.FindById(formId)
      .then(function(form) {
        var fields = form.fields;
        for(var i = 0; i < fields.length; i++) {
          var field = fields[i];
          if(field.id == fieldId) {
            field = updateField;
          }
        }

        model.updateForm(formId, form)
          .then(function(form) {
            res.json(updateField);
          });
      });
  });
};

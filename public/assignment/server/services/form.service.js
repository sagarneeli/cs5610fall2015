"use strict";

module.exports = function(app, formModel){
  app.get("/api/assignment/user/:userId/form", function(req, res) {
    var userId = req.params.userId;
    formModel.findAllFormsForUser(userId)
      .then(function(forms){
        res.json(forms);
      });
  });

  app.get(" /api/assignment/form/:formId", function(req, res) {
    var formId = req.params.formId;
    formModel.findFormById(formId)
      .then(function(form){
        res.json(form);
      });
  });

  app.delete("/api/assignment/form/:formId", function(req, res) {
    var formId = req.params.formId;
    formModel.deleteFormById(formId)
      .then(function(forms){
        res.json(forms);
      });
  });

  app.post("/api/assignment/user/:userId/form", function(req, res) {
    var form = req.body;
    var userId = req.params.userId;
    formModel.createForm(userId, form)
      .then(function(newForm){
        res.json(newForm);
      });
  });

  app.put("/api/assignment/form/:formId", function(req, res) {
    var form = req.body || {};
    var formId = req.params.formId;
    formModel.updateForm(formId, form)
      .then(function(newForm){
        res.json(newForm);
      });
  });
};

"use strict"

module.exports = function (app, model) {

  var uuid = require('node-uuid');

  app.get('/api/assignment/user/:userId/form', function(req, res) {
    res.json(model.FindFormsByUserId(req.params.userId));
  });


  app.get('/api/assignment/form/:formId', function(req, res) {
    res.json(model.FindById(req.params.formId));
  });


  app.delete('/api/assignment/form/:formId', function(req, res){
    res.json(model.Delete(req.params.formId));
  });


  app.post('/api/assignment/user/:userId/form', function(req, res) {
    var newForm = req.body || {};
    var userId = req.params.userId;
    newForm.userId = Number(userId);
    res.json(model.Create(newForm));
  });


  app.put('/api/assignment/form/:formId', function(req, res) {
    res.json(model.Update(req.params.formId, req.body));
  });


};

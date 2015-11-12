module.exports = function (app, model) {

  app.get('/api/assignment/form/:formId/field', function (req, res) {
    var formId = req.params.formId;
    res.json(model.findByFormId(formId).fields);
  });

  app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    res.json(model.findField(formId, fieldId));
  });

  app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    res.json(model.deleteField(formId, fieldId));
  });

  app.post('/api/assignment/form/:formId/field', function (req, res) {
    var formId = req.params.formId;
    var field = req.body;
    res.json(model.addField(formId, field));
  });

  app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = req.body;
    res.json(model.updateField(formId, fieldId, field));
  });
};

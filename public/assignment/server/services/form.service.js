module.exports = function (app, model) {

  app.get('/api/assignment/form', function (req, res) {
    res.json(model.findAll());
  });

  app.get('/api/assignment/user/:userId/form', function (req, res) {
    var userId = req.params.userId;
    res.json(model.findByUserId(userId));
  });

  app.get('/api/assignment/form/:formId', function (req, res) {
    var formId = req.params.formId;
    res.json(model.findByFormId(formId));
  });

  app.delete('/api/assignment/form/:formId', function (req, res) {
    var formId = req.params.formId;
    res.json(model.deleteForm(formId));
  });

  app.post('/api/assignment/user/:userId/form', function (req, res) {
    var userId = req.params.userId;
    var form = req.body;
    res.json(model.addForm(form));
  });

  app.put('/api/assignment/form/:formId', function (req, res) {
    var formId = req.params.formId;
    var form = req.body;
    res.json(model.updateForm(formId, form));
  });

};

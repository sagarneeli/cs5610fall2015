module.exports = function (app, model, db) {
  app.get("/api/assignment/form/:formId/field", findFields);
  app.get("/api/assignment/form/:formId/field/:fieldId", findField);
  app.get("/api/assignment/user/:userId/form/:formId/field", findFieldsForFormAndUser);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
  app.post("/api/assignment/form/:formId/field", createField);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

  function findFields(req, res) {
    model
      .findFieldsByFormId(req.params.formId)
      .then(function (fields) {
        res.json(fields);
      });
  };

  function findFieldsForFormAndUser(req, res) {
    model
      .findFieldsByFormAndUser(req.params.formId, req.params.userId)
      .then(function (fields) {
        res.json(fields);
      });
  };

  function findField(req, res) {
    model
      .findField(req.params.formId, req.params.fieldId)
      .then(function (field) {
        res.json(field);
      });
  };

  function deleteField(req, res) {
    model
      .deleteField(req.params.formId, req.params.fieldId)
      .then(function (fields) {
        res.json(fields);
      });
  };

  function createField(req, res) {
    model
      .createField(req.params.formId, req.body)
      .then(function (fields) {
        res.json(fields);
      });
  };

  function updateField(req, res) {
    model
      .updateField(req.params.formId, req.params.fieldId, req.body)
      .then(function (fields) {
        res.json(fields);
      });
  };
};

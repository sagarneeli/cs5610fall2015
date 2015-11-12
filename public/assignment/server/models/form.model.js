module.exports = function (app) {
  var forms = require('./form.mock.json');
  var uuid = require('node-uuid');

  var api = {
    createForm: createForm,
    findAll: findAll,
    findByFormId: findByFormId,
    updateForm: updateForm,
    deleteForm: deleteForm,
    findFormByTitle: findFormByTitle,
    findByUserId: findByUserId,
    addForm: addForm,
    deleteField: deleteField,
    findField: findField,
    addField: addField,
    updateField: updateField
  };
  return api;

  function createForm(form) {
    if (!form)
      return;
    forms.push(form);
    return forms;
  }

  function findAll() {
    return forms;
  }

  function findByFormId(id) {
    for (var i = 0; i < forms.length; ++i) {
      var form = forms[i];
      if (form.id == id)
        return form;
    }
    return null;
  }

  function findByUserId(userId) {
    return forms.filter(function (form) {
      return form.userId == userId;
    });
  }

  function updateForm(id, form) {
    var old = findByFormId(id);
    if (old == null)
      return forms;
    if (form.title)
      old.title = form.title;
    if (form.userId)
      old.userId = form.userId;
    if (form.fields)
      old.fields = form.fields;
    return forms;
  }

  function deleteForm(id) {
    for (var i = 0; i < forms.length; ++i) {
      var form = forms[i];
      if (form.id == id)
        forms.splice(i, 1);
    }
    return forms;
  }

  function findField(formId, fieldId) {
    var form = findByFormId(formId);
    var fields = form.fields;
    if (!fields)
      return null;
    for (var i = 0; i < fields.length; ++i) {
      var field = fields[i];
      if (field.id == fieldId)
        return field;
    }
    return null;
  }

  function deleteField(formId, fieldId) {
    var form = findByFormId(formId);
    if (!form)
      return null;
    var fields = form.fields;
    for (var i = 0; i < fields.length; ++i) {
      var field = fields[i];
      if (field.id == fieldId) {
        fields.splice(i, 1);
        break;
      }
    }
    return fields;
  }

  function addField(formId, field) {
    var form = findByFormId(formId);
    if (!form)
      return null;
    field['id'] = uuid.v1();
    if (!form.fields)
      form.fields = [];
    form.fields.push(field);
    return form.fields;
  }

  function updateField(formId, fieldId, field) {
    var form = findByFormId(formId);
    if (!form || !form.fields)
      return null;

    var fields = form.fields;
    for (var i = 0; i < fields.length; ++i) {
      var old = fields[i];
      if (old.id == fieldId) {
        if (field.label)
          old.label = field.label;
        if (field.type)
          old.type = field.type;
        if (field.placeholder)
          old.placeholder = field.placeholder;
        break;
      }
    }
    return fields;
  }

  function findFormByTitle(title) {
    for (var i = 0; i < forms.length; ++i) {
      var form = forms[i];
      if (form.title == title) {
        return form;
      }
    }
    return null;
  }

  function addForm(form) {
    form['id'] = uuid.v1();
    forms.push(form);
    return forms;
  }
};

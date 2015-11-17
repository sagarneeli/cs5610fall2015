"use strict";

var uuid = require('node-uuid');

module.exports = function (app) {
  var forms = require("./form.mock.json").forms;

  var api = {
    Create: Create,
    FindAll: FindAll,
    FindById: FindById,
    FindFormByTitle: FindFormByTitle,
    FindFormsByUserId: FindFormsByUserId,
    Update: Update,
    Delete: Delete
  };

  return api;

  function Create(form) {
    form.id = uuid.v1();
    forms.push(form);
    return form;
  }

  function FindAll() {
    return forms;
  }

  function FindById(id) {
    for (var index = 0; index < forms.length; index++) {
      var form = forms[index];
      if (form.id == id)
        return form;
    }
  }

  function FindFormByTitle(title) {
    for (var index = 0; index < forms.length; index++) {
      var form = forms[index];
      if (form.title == title)
        return form;
    }
  }

  function FindFormsByUserId(userId) {
    var userForms = [];
    for (var index = 0; index < forms.length; index++) {
      var form = forms[index];
      if (form.userId == userId)
        return userForms.push(form);
    }
  }

  function Update(id, newForm) {
    var form = FindById(id);
    for(var property in newForm) {
      if (newForm[property]) {
        form[property] = newForm[property];
      }
    }
    return form;
  }

  function Delete(id) {
    var found = false;
    var userId;
    for (var index = 0; index < forms.length; index++) {
      var form = forms[index];
      if (form.id == id) {
        found = true;
        userId = form.userId;
        forms.splice(index, 1);
      }
    }
    if (found) {
      var remainingForms = [];
      for (var index = 0; index < forms.length; index++) {
        var form = forms[index];
        if (form && form.userId == userId) {
          remainingForms.push(form);
        }
      }
    }
    return remainingForms;
  }
};

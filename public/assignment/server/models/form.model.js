"use strict";

module.exports = function (db, mongoose) {
  var FormSchema = require('./form.schema.js')(mongoose);
  var FormModel = mongoose.model("FormModel", FormSchema);
  var uuid = require('node-uuid');
  var q = require('q');

  var api = {
    Create: Create,
    FindAll: FindAll,
    FindById: FindById,
    FindFormByTitle: FindFormByTitle,
    FindFormsByUserId: FindFormsByUserId,
    Update: Update,
    Delete: Delete,
    findFieldsByFormAndUser: findFieldsByFormAndUser,
    findFieldsByFormId: findFieldsByFormId,
    findField: findField,
    deleteField: deleteField,
    createField: createField,
    updateField: updateField
  };

  return api;

  function Create(form) {
    var deferred = q.defer();
    FormModel.create(form, function(err, form) {
      if (!err)
        deferred.resolve(form);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function FindAll() {
    var deferred = q.defer();
    FormModel.find(function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function FindById(id) {
    var deferred = q.defer();
    FormModel.findById(id, function(err, form) {
      if (!err)
        deferred.resolve(form);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function FindFormByTitle(title) {
    var deferred = q.defer();
    FormModel.find({title : title}, function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function FindFormsByUserId(userId) {
    var deferred = q.defer();
    FormModel.find({userId : userId}, function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function Update(id, form) {
    var deferred = q.defer();
    FormModel.update({_id : id}, {$set : form}, function(err, newForm) {
      if (!err)
        deferred.resolve(newForm);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function Delete(id) {
    var deferred = q.defer();
    FormModel.delete(id, function(err, form) {
      if (!err)
        deferred.resolve(form);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function findFieldsByFormId(formId) {
    var deferred = q.defer();
    FormModel.findById(formId, function (err, form) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(form.fields);
      }
    });

    return deferred.promise;
  };

  function findField(formId, fieldId) {
    var deferred = q.defer();
    FormModel.findById(formId, function (err, form) {
      for (var i = 0; i < form.fields.length; i++){
        var field = form.fields[i];
        //for (var field of form.fields) {
        if (field._id.equals(fieldId)) {
          deferred.resolve(field);
        }
      }
    });

    return deferred.promise;
  };

  function deleteField(formId, fieldId) {
    var deferred = q.defer();
    FormModel.findById(formId, function (err, form) {
      for (var i = 0; i < form.fields.length; i++) {
        if (form.fields[i]._id.equals(fieldId)) {
          form.fields.splice(i, 1);

          form.save(function (err) {
            deferred.resolve(form.fields);
          });
        }
      }
    });
    return deferred.promise;
  };

  function createField(formId, field) {
    var deferred = q.defer();
    FormModel.findById(formId, function (err, form) {
      field._id = mongoose.Types.ObjectId();
      form.fields.push(field);
      form.save(function (err) {
        deferred.resolve(form.fields);
      });
    });
    return deferred.promise;
  };

  function updateField(formId, fieldId, field) {
    var deferred = q.defer();
    FormModel.findOne({ "_id": formId }, function (err, form) {
      for (var i = 0; i < form.fields.length; i++) {
        if (form.fields[i]._id.equals(fieldId)) {
          form.fields[i] = field;
          form.fields[i]._id = fieldId;

          form.save(function (err) {
            deferred.resolve(form.fields);
          });
        }
      }
    });
    return deferred.promise;
  };

  function findFieldsByFormAndUser(formId, userId) {
    var deferred = q.defer();
    FormModel.findOne({ "_id": formId, "userId": userId }, function (err, form) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(form.fields);
      }
    });
    return deferred.promise;
  };
};

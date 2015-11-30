"use strict";

var q = require("q"),
  Promise = require('bluebird');

module.exports = function(db, mongoose) {
  var FormSchema = require('./form.schema.js')(mongoose),
    FormModel = db.model('FormModel', FormSchema);

  var api = {
    Create: Create,
    findAllForms: findAllForms,
    findAllFormsForUser: findAllFormsForUser,
    findFormById: findFormById,
    findFormByTitle: findFormByTitle,
    Update: Update,
    Delete: Delete
  };

  return api;

  function Create(userId, form) {
    var deferred = q.defer();
    form.id = form._id = mongoose.Types.ObjectId();
    form.userId = userId;
    FormModel.create(form, function(err, form) {
      if (!err)
        deferred.resolve(form);
      else {
        console.log("Error while Create : ", err);
        deferred.reject(err);
      }
    });
    return deferred.promise;
  }

  function findAllForms() {
    var deferred = q.defer();
    FormModel.find(function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function findFormById(formId){
    var deferred = q.defer();
    FormModel.findOne({id: formId}, function(err, form) {
      if (!err)
        deferred.resolve(form);
      else
        deferred.reject(err);
    });
    return deferred.promise;

  }

  function findFormByTitle(title){
    var deferred = q.defer();
    FormModel.findOne({title : title}, function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function findAllFormsForUser(userId){
    var deferred = q.defer();
    FormModel.find({userId : userId}, function(err, forms) {
      if (!err)
        deferred.resolve(forms);
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function Update(formId, newForm){
    var deferred = q.defer();
    FormModel.findOne({id : formId}, function(err, form) {
      if (!err){
        for(var prop in form) {
          if (!(typeof newForm[prop] == 'undefined')){
            form[prop] = newForm[prop];
          }
        }
        form.save(function(err) {
          if (err){
            deferred.reject(err);
          } else {
            deferred.resolve(form);
          }
        });
      }
      else
        deferred.reject(err);
    });
    return deferred.promise;
  }

  function Delete(formId){
    var deferred = q.defer();
    findFormById(formId)
      .then(function(form){
        var userId = form.userId;
        FormModel.remove({id: formId}, function(err){
          if(err){
            deferred.reject(err);
          } else {
            findAllFormsForUser(userId)
              .then(function(forms){
                deferred.resolve(forms);
              });
          }
        });
      });
    return deferred.promise;
  }


};

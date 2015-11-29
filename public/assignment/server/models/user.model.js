"use strict";

module.exports = function(db, mongoose) {
  var uuid = require('node-uuid');
  var q = require('q');
  var UserSchema = require("./user.schema.js")(mongoose);
  var UserModel = mongoose.model("UserModel", UserSchema);

  var api = {
    Create: Create,
    FindAll: FindAll,
    FindById: FindById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    Update: Update,
    Delete: Delete
  };

  return api;

  function Create(user) {
    var deferred = q.defer();
    UserModel.create(user, function(err, users) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(users);
    });
    return deferred.promise;
  }

  function FindAll() {
    var deferred = q.defer();
    UserModel.find(function(err, users) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(users);
    });
    return deferred.promise;
  }

  function FindById(id) {
    var deferred = q.defer();
    UserModel.findOne({ _id : id }, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }

  function findUserByUsername(username) {
    var deferred = q.defer();
    UserModel.findOne({username : username}, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }


  function findUserByCredentials(credentials) {
    var deferred = q.defer();
    var username = credentials.username;
    var password = credentials.password;
    UserModel.findOne({username : username, password : password}, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }

  function Update(id, user) {
    var deferred = q.defer();
    UserModel.update({_id : id}, {$set : user}, function(err, newUser) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(newUser);
    });
    return deferred.promise;
  }

  function Delete(id) {
    var deferred = q.defer();
    UserModel.remove({_id : id}, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }

};

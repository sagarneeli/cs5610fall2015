"use strict";

var q = require("q"),
  Promise = require('bluebird');
//mongoose = require("mongoose");

module.exports = function(db, mongoose) {
  var UserSchema = require('./user.schema.js')(mongoose),
    UserModel = db.model('UserModel', UserSchema);

  var api = {
    "createUser": createUser,
    "findAllUsers": findAllUsers,
    "findUserById": findUserById,
    "updateUser": updateUser,
    "deleteUserById": deleteUserById,
    "findUserByUsername": findUserByUsername,
    "findUserByCredentials": findUserByCredentials
  };

  return api;

  function createUser(user){
    var deferred = q.defer();
    user.id = user._id = mongoose.Types.ObjectId();
    UserModel.create(user, function(err, newUser) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(newUser);
    });
    return deferred.promise;
  }

  function findAllUsers(){
    var deferred = q.defer();
    UserModel.find(function(err, users) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(users);
    });
    return deferred.promise;
  }

  function findUserById(id){
    var deferred = q.defer();
    UserModel.findOne({id : id}, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }

  function findUserByUsername(username){
    var deferred = q.defer();
    UserModel.findOne({username : username}, function(err, user) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve(user);
    });
    return deferred.promise;
  }

  function findUserByCredentials(credentials){
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


  function updateUser(userId, newUser){
    var deferred = q.defer();
    UserModel.findOne({id: userId}, function(err, user){
      if (err || !user){
        deferred.reject(err);
      } else {
        for(var prop in user) {
          if (!(typeof newUser[prop] == 'undefined')){
            user[prop] = newUser[prop];
          }
        }
        user.save(function(err) {
          if (err){
            deferred.reject(err);
          } else {
            deferred.resolve(user);
          }
        });
      }
    });
    return deferred.promise;
  }

  function deleteUserById(userId){
    var deferred = q.defer();
    UserModel.remove({id: userId}, function(err){
      if(err){
        deferred.reject(err);
      } else {
        findAllUsers()
          .then(function(users){
            deferred.resolve(users);
          });
      }
    });
    return deferred.promise;
  }




};

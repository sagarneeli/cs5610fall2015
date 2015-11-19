"use strict";

var users = require('./user.mock.json').users;
var uuid = require('node-uuid');

module.exports = function(app) {
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
    user.id = uuid.v1();
    users.push(user);
    return users;
  }

  function FindAll() {
    return users;
  }

  function FindById(id) {
    for (var index = 0; index < users.length; index++) {
      var user = users[index];
      if (user.id == id)
        return user;
    }
    return null;
  }

  function findUserByUsername(username) {
    for (var index = 0; index < users.length; index++) {
      var user = users[index];
      if (user.username == username)
        return user;
    }
    return null;
  }


  function findUserByCredentials(credentials) {
    for (var index = 0; index < users.length; index++) {
      var user = users[index];
      if (user.username == credentials.username && user.password == credentials.password)
        return user;
    }
    return null;
  }

  function Update(id, newUser) {
    var user = FindById(id);
    for(var property in newUser) {
      user[property] = newUser[property];
    }
    //user.id = id;
    return user;
  }

  function Delete(id) {
    for (var index = 0; index < users.length; index++) {
      var user = users[index];
      if (user.id == id) {
        users.splice(index, 1);
        return users;
      }
    }
    return null;
  }

};

module.exports = function (app) {

  var users = require("./user.mock.json");
  var uuid = require('node-uuid');

  var api = {
    createUser: createUser,
    findAll: findAllUsers,
    findUserById: findUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername
  };
  return api;

  function createUser(user) {
    if (!user)
      return;
    user['id'] = uuid.v1();
    users.push(user);
    return users;
  }

  function findAllUsers() {
    return users;
  }

  function findUserById(id) {
    for (var i = 0; i < users.length; ++i) {
      var user = users[i];
      if (user.id == id)
        return user;
    }
    return null;
  }

  function updateUser(id, user) {
    //TODO verify if really changed
    var old = findUserById(id);
    // null check
    if (!user || !old)
      return;
    if (user.firstName)
      old.firstName = user.firstName;
    if (user.lastName)
      old.lastName = user.lastName;
    if (user.username)
      old.username = user.username;
    if (user.password)
      old.password = user.password;
  }

  function deleteUser(id) {
    for (var i = 0; i < users.length; ++i) {
      var user = users[i];
      if (user.id == id) {
        users.splice(i, 1);
      }
    }
  }

  function findUserByUsername(username) {
    for (var i = 0; i < users.length; ++i) {
      var user = users[i];
      if (user.username == username) {
        return user;
      }
    }
  }

  function findUserByCredentials(credentials) {
    var username = credentials.username;
    var password = credentials.password;
    for (var i = 0; i < users.length; ++i) {
      var user = users[i];
      if (user.username == username && user.password == password)
        return user;
    }
    return null;
  }
};

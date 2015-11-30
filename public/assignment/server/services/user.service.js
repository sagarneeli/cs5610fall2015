"use strict";

module.exports = function(app, userModel) {
	app.post("/api/assignment/user", function(req, res) {
    var user = req.body;
    userModel.Create(user)
      .then(function(newUser) {
        res.json(newUser);
      });
  });

	app.get("/api/assignment/user", function(req, res) {
    if (req && req.query && req.query.username && req.query.password){
      var username = req.query.username;
      var password = req.query.password;
      if (!username){
        res.status(400).send("No username");
      } else if(!password){
        res.status(400).send("No password");
      } else {
        var credentials = {
          "username" : username,
          "password" : password
        }
        userModel.findUserByCredentials(credentials)
          .then(function(user) {
            res.json(user);
          });
      }
    } else if (req && req.query && req.query.username){
      var username = req.query.username;
      if (!username){
        res.status(400).send("No username");
      } else {
        userModel.findUserByUsername(username)
          .then(function(user) {
            res.json(user);
          });
      }
    } else {
      userModel.FindAll()
        .then(function(users) {
          res.json(users);
        });
    }
  });

	app.get("/api/assignment/user/id/:id", 	function(req, res) {
    var userId = req.params.id;
    userModel.FindById(userId)
      .then(function(user){
        res.json(user);
      });
  });

	app.put("/api/assignment/user/:id", function(req, res) {
    var updatedUser = req.body;
    var userId = req.params.id;
    userModel.Update(userId, updatedUser)
      .then(function(user){
        res.json(user);
      });
  });

	app.delete("/api/assignment/user/:id", function(req, res) {
    var userId = req.params.id;
    userModel.Delete(userId)
      .then(function(users) {
        res.json(users);
      });
  });
};

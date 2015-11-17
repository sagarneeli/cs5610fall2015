"use strict"

module.exports = function (app, model) {

  app.post("/api/assignment/user", function(req, res) {
    //res.json(model.Create(req.body));
    model.Create(req.body)
      .then(function(newUser) {
        res.json(newUser);
      });
  });

  app.get('/api/assignment/user', function(req, res) {
    //var username = req.param('username');
    //var password = req.param('password');
    var username = req.query.username;
    var password = req.query.password;

    if(username == null && password == null) {
      res.json(model.FindAll());
    } else if (password == null) {
      res.json(model.findUserByUsername(username));
    } else {
      res.json(model.findUserByCredentials({
        username: username,
        password: password
      }));
    }
  });

  app.get('/api/assignment/user/:id', function(req, res) {
    res.json(model.FindById(req.params.id));
  });


  app.put('/api/assignment/user/:id', function(req, res) {
    res.json(model.Update(req.params.id, req.body));
  });

  app.delete('/api/assignment/user/:id', function(req, res){
    res.json(model.Delete(req.params.id));
  });

};

module.exports = function (app, model) {

  app.post('/api/assignment/user', function (req, res) {
    var user = req.body;
    model.createUser(user);
    res.json(model.findAll());
  });

  app.get('/api/assignment/user', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    if (username && password) {
      var credential = {'username': username, 'password': password};
      res.json(model.findUserByCredentials(credential));
      return;
    }
    if (username) {
      res.json(model.findUserByUsername(username));
      return;
    }
    res.json(model.findAll());
  });

  app.get('/api/assignment/user/:id', function (req, res) {
    var id = req.params.id;
    var user = model.findUserById(id);
    if (user)
      res.json(user);
  });


  app.put('/api/assignment/user/:id', function (req, res) {
    var id = req.params.id;
    var user = req.body;
    model.updateUser(id, user);
    res.json(model.findAll());
  });

  app.delete('/api/assignment/user/:id', function (req, res) {
    var id = req.params.id;
    model.deleteUser(id);
    res.json(model.findAll());
  });
};

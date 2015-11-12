module.exports = function(app) {
  var model = require("./models/user.model.js")();
  require("./services/user.service.js")(app, model);
};

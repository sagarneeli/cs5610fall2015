"use strict";

module.exports = function(app, passport) {
  require("./services/tweets.service.js")(app);
};

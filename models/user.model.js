var mongoose = require('mongoose');

// create a user model
var User = mongoose.model('User', {
  id: String,
  token: String,
  username: String,
  displayName: String,
  lastStatus: String,
  created: Date
});


module.exports = User;

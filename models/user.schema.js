'use strict';

module.exports = function (mongoose) {
  var userSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email : String
  }, {collection: 'cs5610.assignment.user'});
  return userSchema;
};


//var User = mongoose.model('User', {
//  id: String,
//  token: String,
//  username: String,
//  displayName: String,
//  lastStatus: String,
//  created: Date
//});

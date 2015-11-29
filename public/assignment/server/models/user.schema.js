'use strict';

module.exports = function (mongoose) {
  var userSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    role : String
  }, {collection: 'cs5610.assignment.user'});
  return userSchema;
};

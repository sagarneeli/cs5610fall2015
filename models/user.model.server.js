var mongoose = require('mongoose');

 //create a user model
var User = mongoose.model('User', {
  id: String,
  token: String,
  tokenSecret: String,
  username: String,
  displayName: String,
  lastStatus: String,
  image: String,
  created: Date
});


module.exports = User;

//module.exports = function(mongoose) {
//  var UserSchema = new mongoose.Schema(
//    {
//      id: String,
//      token: String,
//      tokenSecret: String,
//      username: String,
//      displayName: String,
//      lastStatus: String,
//      created: Date
//    });
//
//  var UserModel = mongoose.model('User', UserSchema);
//
//  var api = {
//    findById: findById
//  };
//
//  function findById(id) {
//    var deferred = q.defer();
//    UserModel.findById(id, function (err, user) {
//      if (!err) {
//        deferred.resolve(user);
//      } else {
//        deferred.reject(err);
//      }
//    });
//    return deferred.promise;
//  }
//
//};


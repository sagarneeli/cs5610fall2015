module.exports = function (mongoose) {
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String
  }, { collection: "cs5610.assignment.user" });
  return userSchema;
};

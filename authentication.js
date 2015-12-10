var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./models/user.model.server.js');
var config = require('./config.js');

module.exports = passport.use(new TwitterStrategy({
  consumerKey: config.consumer_key,
  consumerSecret: config.consumer_secret,
  callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

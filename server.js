#!/bin/env node
//  OpenShift sample Node application
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var multer  = require('multer')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config.js');
var User = require('./models/user.model.js');
var TwitterStrategy = require('passport-twitter').Strategy;
var app = express();
var OAuth= require('oauth').OAuth;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  //console.log('serializeUser: ' + user._id);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    //console.log(user);
    if(!err)
      done(null, user);
    else
      done(err, null);
  });
});

app.use(express.logger());
app.use(bodyParser.json());
app.use(express.cookieParser());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/public/bower_components'));

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

require("./public/assignment/server/app.js")(app, db, mongoose);

require("./public/project/server/app.js")(app, passport);

//require("./public/project/server/app.js")(app, passport, mongoose);


//app.get('/auth/twitter',
//  passport.authenticate('twitter'),
//  function(req, res){
//
//  }
//);


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('project/client/index.html#/dashboard/home', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    }
    res.json(user);
    //else {
    //  //res.render('dashboard', { user: user});
    //  res.redirect('dashboard', { user: user});
    //}
  });
});

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('project/client/index.html#/dashboard/home1');
  });

//function initTwitterOauth() {
//  oa = new OAuth(
//    "https://twitter.com/oauth/request_token"
//    , "https://twitter.com/oauth/access_token"
//    , config.consumer_key
//    , config.consumer_secret
//    , "1.0A"
//    , "http://" + ipaddress + ":" + port + "/twitter/authn/callback"
//    , "HMAC-SHA1"
//  );
//}

passport.use(new TwitterStrategy({
    consumerKey     : config.consumer_key,
    consumerSecret  : config.consumer_secret,
    callbackURL     : "http://" + ipaddress + ":" + port + "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
      console.log(token);
      console.log(tokenSecret);
      console.log(profile);
      User.findOne({ 'id' : profile.id }, function(err, user) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          console.log(err);
          return done(err);
        }
        // if the user is found then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user, create them
          var newUser = new User();
          // set all of the user data that we need
          newUser.id          = profile.id;
          newUser.token       = token;
          newUser.username = profile.username;
          newUser.displayName = profile.displayName;
          newUser.lastStatus = profile._json.status.text;
          // save our user into the database
          newUser.save(function(err) {
            if (err)
              throw err;
            console.log("saving user....")
            return done(null, newUser);
          });
        }
      });
    });

  }));

app.listen(port, ipaddress, function() {
  console.log('Listening at http://%s:%s', ipaddress, port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

//app.get('/', routes.index);
//app.get('/api/trends/:woeid', api.trends);


#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var mongoose = require('mongoose');
var multer  = require('multer')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
//var routes = require('./routes');

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterAuthn;
var twitterAuthz;
var user = { id: "abc" };
var OAuth= require('oauth').OAuth;
var oa;
var config = require('./config');
var domain = "localhost";


function initTwitterOauth() {
  oa = new OAuth(
    "https://twitter.com/oauth/request_token"
    , "https://twitter.com/oauth/access_token"
    , config.consumer_key
    , config.consumer_secret
    , "1.0A"
    , "http://" + domain + ":" + port + "/twitter/authn/callback"
    , "HMAC-SHA1"
  );
}

function makeTweet(cb) {
  oa.post(
    "https://api.twitter.com/1.1/statuses/update.json"
    , user.token
    , user.tokenSecret
    , {"status": "How to Tweet & Direct Message using NodeJS http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html via @coolaj86" }
    , cb
  );
}

function makeDm(sn, cb) {
  oa.post(
    "https://api.twitter.com/1.1/direct_messages/new.json"
    , user.token
    , user.tokenSecret
    , {"screen_name": sn, text: "test message via nodejs twitter api. pulled your sn at random, sorry."}
    , cb
  );
}

passport.serializeUser(function(_user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

twitterAuthn = new TwitterStrategy({
    consumerKey: config.consumer_key
    , consumerSecret: config.consumer_secret
    //, callbackURL: "http://" + domain + ":" + port + "/twitter/authn/callback"
  },
  function(token, tokenSecret, profile, done) {
    user.token = token;
    user.tokenSecret = tokenSecret;
    user.profile = profile;
    done(null, user);
  }
);
twitterAuthn.name = 'twitterAuthn';

twitterAuthz = new TwitterStrategy({
    consumerKey: config.consumer_key
    , consumerSecret: config.consumer_secret
    //, callbackURL: "http://" + domain + ":" + port + "/twitter/authz/callback"
    , userAuthorizationURL: 'https://api.twitter.com/oauth/authorize'
  },
  function(token, tokenSecret, profile, done) {
    user.token = token;
    user.tokenSecret = tokenSecret;
    user.profile = profile;
    user.authorized = true;
    initTwitterOauth();
    done(null, user);
  }
);
twitterAuthz.name = 'twitterAuthz';

passport.use(twitterAuthn);
passport.use(twitterAuthz);

app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({ secret: "blahhnsnhoaeunshtoe" }));
app.use(passport.initialize());
app.use(passport.session());

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

require("./public/project/server/app.js")(app);



app.get('/twitter/authn', passport.authenticate('twitterAuthn'));

app.get(
  '/twitter/authn/callback'
  , passport.authenticate(
    'twitterAuthn'
    , { failureRedirect: '/nfailure' }
  )
  , function (req, res) {
    // TODO if a direct message fails, remove this and try again
    // the user may have unauthorized the app
    if (!user.authorized) {
      res.redirect('/twitter/authz');
      return;
    }
    res.redirect('/auth-callback');
  }
);
app.get('/twitter/authz', passport.authenticate('twitterAuthz'))

app.get(
  '/twitter/authz/callback'
  , passport.authenticate(
    'twitterAuthz'
    , { successRedirect: '/project/client/views/dashboard/home/home.view.html'
      , failureRedirect: '/zfailure'
    }
  )
);

app.get('/twitter/tweet', function (req, res) {
  makeTweet(function (error, data) {
    if(error) {
      console.log(require('sys').inspect(error));
      res.end('bad stuff happened');
    } else {
      console.log(data);
      res.end('go check your tweets!');
    }
  });
});

app.get('/twitter/direct/:sn', function (req, res) {
  makeDm(req.params.sn, function (error, data) {
    if(error) {
      console.log(require('sys').inspect(error));
      res.end('bad stuff happened (dm)');
    } else {
      console.log(data);
      res.end("the message sent (but you can't see it!");
    }
  });
});

app.get('/auth-callback', function(req, res){
  console.log('auth-callback,user', req.user);
  //res.render('auth-callback', { user: JSON.stringify(req.user) });
  res.json({ user: JSON.stringify(req.user) });
});

app.post('/auth-callback', function(req, res){
  console.log('auth-callback,user', req.user);
  //res.render('auth-callback', { user: JSON.stringify(req.user) });
  res.json({ user: JSON.stringify(req.user) });
});

initTwitterOauth();


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress, function() {
  console.log('Listening at http://%s:%s', ipaddress, port);
});

//app.get('/', routes.index);
//app.get('/api/trends/:woeid', api.trends);


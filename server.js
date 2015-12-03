#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var mongoose = require('mongoose');
var multer  = require('multer')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
//var routes = require('./routes');

app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

//app.set('view-engine', ejs);
//
//app.get('/lecture/ejs/hello', function(req, res) {
//  res.render('hello')
//});
//app.engine('html', require('ejs').renderFile);

require("./public/assignment/server/app.js")(app, db, mongoose);

require("./public/project/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress, function() {
  console.log('Listening at http://%s:%s', ipaddress, port);
});

//app.get('/', routes.index);
//app.get('/api/trends/:woeid', api.trends);


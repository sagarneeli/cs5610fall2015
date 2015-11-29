#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var mongoose = require('mongoose');
var multer  = require('multer')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use(express.static(__dirname + '/public'));

var db = mongoose.connect('mongodb://localhost/cs5610');

require("./public/assignment/server/app.js")(app, db, mongoose);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress, function() {
  console.log('Form app listening at http://%s:%s', ipaddress, port);
});


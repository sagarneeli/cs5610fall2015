#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var UserModel = require("./public/assignment/server/models/user.model.js")(app);
var FormModel = require("./public/assignment/server/models/form.model.js")(app);
var UserService = require("./public/assignment/server/services/user.service.js")(app, UserModel);
var FormService = require("./public/assignment/server/services/form.service.js")(app, FormModel);
var FieldService = require("./public/assignment/server/services/field.service.js")(app, FormModel);

app.listen(port, ipaddress);


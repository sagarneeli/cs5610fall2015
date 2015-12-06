"use-strict";

var Twit = require('twit');
var config = require('../../../../config');
var twitter = new Twit(config);

module.exports = function(app) {
  app.get('/api/trends/:woeid', function(req, res) {
    var woeid = req.params.woeid;
    twitter.get('trends/place', {id: woeid}, function(err, data) {
      if (typeof data === "undefined") {
        res.json({status: false});
      } else {
        res.json({trends: data, status: true});
      }
    });
  });
};

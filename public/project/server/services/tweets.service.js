"use-strict";

var Twit = require('twit');
var config = require('../../../../config');
var twitter = new Twit(config);
var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';

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

  app.get('/tweets/user_timeline/:user', function(req, res) {
    var oEmbedTweets = [], tweets = [],
      params = {
        screen_name: req.params.user, // the user id passed in as part of the route
        count: TWEET_COUNT // how many tweets to return
      };
    // the max_id is passed in via a query string param
    if(req.query.max_id) {
      params.max_id = req.query.max_id;
    }
    // request data
    twitter.get(USER_TIMELINE_URL, params, function (err, data, resp) {
      tweets = data;
      var i = 0, len = tweets.length;
      for(i; i < len; i++) {
        getOEmbed(tweets[i]);
      }
    });
    /**
     * requests the oEmbed html
     */
    function getOEmbed (tweet) {
      // oEmbed request params
      var params = {
        "id": tweet.id_str,
        "maxwidth": MAX_WIDTH,
        "hide_thread": true,
        "omit_script": true
      };

      // request data
      twitter.get(OEMBED_URL, params, function (err, data, resp) {
        tweet.oEmbed = data;
        oEmbedTweets.push(tweet);

        // do we have oEmbed HTML for all Tweets?
        if (oEmbedTweets.length == tweets.length) {
          res.setHeader('Content-Type', 'application/json');
          res.send(oEmbedTweets);
        }
      });
    }
  });
};

"use-strict";

var Twit = require('twit');
var config = require('../../../../config');
var twitter = new Twit(config);
var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';
var sentimental = require('Sentimental');
var async = require('async');
var util = require('util');
var debug = require('debug')('explorer');


var io = require('socket.io');

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

  app.post('/search', function(req, res) {
    // grab the request from the client
    var choices = JSON.parse(req.body.choices);
    // grab the current date
    var today = new Date();
    // establish the twitter config (grab your keys at dev.twitter.com)
    console.log("----------")

    // grade 20 tweets from today with keyword choice and call callback
    // when done
    function getAndScoreTweets(choice, callback) {
      twitter.get('search/tweets', {q: '' + choice + ' since:' + today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' + today.getDate(), count:20}, function(err, data) {
        // perfrom sentiment analysis (see below)
        if(err) {
          console.log(err);
          callback(err.message, undefined);
          return;
        }
        var score = performAnalysis(data['statuses']);
        console.log("score:", score)
        console.log("choice:", choice)
        callback(null, score);
      });
    }
    //Grade tweets for each choice in parallel and compute winner when
    //all scores are collected
    async.map(choices, getAndScoreTweets, function(err, scores) {
      if(err) {
        console.log("Unable to score all tweets");
        res.end(JSON.stringify(err));
      }
      var highestChoice = choices[0];
      var highestScore = scores.reduce(function(prev, cur, index) {
        if(prev < cur) {
          highestChoice = choices[index];
          return cur;
        } else {
          return prev;
        }
      });
      res.end(JSON.stringify({'score': highestScore, 'choice': highestChoice}));
    });
  });

  function performAnalysis(tweetSet) {
    //set a results variable
    var results = 0;
    // iterate through the tweets, pulling the text, retweet count, and favorite count
    for(var i = 0; i < tweetSet.length; i++) {
      var tweet = tweetSet[i]['text'];
      var retweets = tweetSet[i]['retweet_count'];
      var favorites = tweetSet[i]['favorite_count'];
      // remove the hashtag from the tweet text
      tweet = tweet.replace('#', '');
      // perfrom sentiment on the text
      var score = sentimental.analyze(tweet)['score'];
      // calculate score
      results += score;
      if(score > 0){
        if(retweets > 0) {
          results += (Math.log(retweets)/Math.log(2));
        }
        if(favorites > 0) {
          results += (Math.log(favorites)/Math.log(2));
        }
      }
      else if(score < 0){
        if(retweets > 0) {
          results -= (Math.log(retweets)/Math.log(2));
        }
        if(favorites > 0) {
          results -= (Math.log(favorites)/Math.log(2));
        }
      }
      else {
        results += 0;
      }
    }
    // return score
    results = results / tweetSet.length;
    return results
  }

};

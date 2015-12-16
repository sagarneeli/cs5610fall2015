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
var moment = require('moment');
var Pubnub = require('pubnub');
var sentiment = require('sentiment');

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


  TweetPublisher = { };
  var stream, cachedTweet, publishInterval;
  var tweetPublisher = TweetPublisher;
  var pubnub = TweetPublisher.pubnub = Pubnub({
    publish_key: config.PUBNUB_PUBLISH_KEY,
    subscribe_key: config.PUBNUB_SUBSCRIBE_KEY
  });

  TweetPublisher.start = function () {
    var response = { };
    // If the stream does not exist create it
    if (!stream) {
      // Connect to stream and filter by a geofence that is the size of the Earth
      stream = twitter.stream('statuses/filter', { locations: '-180,-90,180,90' });
      // When Tweet is received only process it if it has geo data
      stream.on('tweet', function (tweet) {
        // calculate sentiment with "sentiment" module
        tweet.sentiment = sentiment(tweet.text);
        // save the Tweet so that the very latest Tweet is available and can be published
        cachedTweet = tweet
      });

      response.message = 'Stream created and started.'
    }
    // If the stream exists start it
    else {
      stream.start();
      response.message = 'Stream already exists and started.'
    }

    // Clear publish interval just be sure they don't stack up (probably not necessary)
    if (publishInterval) {
      clearInterval(publishInterval);
    }

    // Only publish a Tweet every 100 millseconds so that the browser view is not overloaded
    // This will provide a predictable and consistent flow of real-time Tweets
    publishInterval = setInterval(function () {
      if (cachedTweet) {
        publishTweet(cachedTweet);
      }
    }, 100); // Adjust the interval to increase or decrease the rate at which Tweets sent to the clients
    return response;
  }

  /**
   * Stops the stream and publish interval
   **/
  TweetPublisher.stop = function () {
    var response = { };
    if (stream) {
      stream.stop();
      clearInterval(publishInterval);
      response.message = 'Stream stopped.'
    }
    else {
      response.message = 'Stream does not exist.'
    }
    return response;
  }

  var lastPublishedTweetId;

  /**
   * Publishes Tweet object through PubNub to all clients
   **/
  function publishTweet (tweet) {
    if (tweet.id == lastPublishedTweetId) {
      return;
    }
    lastPublishedTweetId = tweet.id;
    pubnub.publish({
      post: false,
      channel: 'tweet_stream',
      message: tweet,
      callback: function (details) {
        // success
      }
    });
  }

  app.get('/stream', function (req, res) {
    // start stream and publishing
    tweetPublisher.start();
    // Render PubNub config for client-side javascript to reference
    //res.render('index', {
    //  subscribe_key: config.PUBNUB_SUBSCRIBE_KEY,
    //  channel: 'tweet_stream'
    //});

    res.send({
      subscribe_key: config.PUBNUB_SUBSCRIBE_KEY,
      channel: 'tweet_stream'
    });

  });

  /**
   * GET Starts stream
   */
  app.get('/stream/start', function (req, res) {
    res.send( tweetPublisher.start() );
  });

  /**
   * GET Stops stream
   */
  app.get('/stream/stop', function (req, res) {
    res.send( tweetPublisher.stop() );
  });

  var trends, trendsTimestamp;

  /**
   * GET Returns trends from Twitter trends API
   */
  app.get('/trends', function (req, res) {
    var now = moment();
    // Only allow request to trends API every 2 minutes to stay within rate limits
    if (trends && trendsTimestamp.diff(now, 'minutes') < 2 ) {
      // return trends from memory
      res.send(trends);
      return;
    }
    twitter.get('trends/place', { id: 1 }, function(err, data, response) {
      if (err) {
        res.send(err);
        return;
      }
      trends = data[0].trends;
      trendsTimestamp = moment();
      res.send(trends);
    });
  });

};

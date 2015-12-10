"use strict";

module.exports = function(app, passport) {
  require("./services/tweets.service.js")(app);

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

  //function makeTweet(cb) {
  //  oa.post(
  //    "https://api.twitter.com/1.1/statuses/update.json"
  //    , user.token
  //    , user.tokenSecret
  //    , {"status": "How to Tweet & Direct Message using NodeJS http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html via @coolaj86" }
  //    , cb
  //  );
  //}
  //
  //function makeDm(sn, cb) {
  //  oa.post(
  //    "https://api.twitter.com/1.1/direct_messages/new.json"
  //    , user.token
  //    , user.tokenSecret
  //    , {"screen_name": sn, text: "test message via nodejs twitter api. pulled your sn at random, sorry."}
  //    , cb
  //  );
  //}


};

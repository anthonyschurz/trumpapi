var Twitter = require('twitter');
var config = require('./config');
var mongodb = require('mongodb');

var insertTweets = function(db, tweets, callback) {
  var mongo_tweets = db.collection('tweets');
  mongo_tweets.insert(tweets, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted %d documents into the "users" collection. '+
      'The documents inserted with "_id" are:', result.length, result);
    }
    callback(result);
  });
};

var client = new Twitter(config.twitter);
var params = {
  screen_name: 'realDonaldTrump',
  exclude_replies: true,
  contributor_details: false,
  include_rts: false,
  trim_user: true,
  count: 200
};

var getTweets = function(client, params, callback) {
  client.get('statuses/user_timeline', params, function(err, tweets, response){
    if (!err) {
      var MongoClient = mongodb.MongoClient;
      MongoClient.connect(config.mongo.url, function (err, db) {
        if (!err) {
          insertTweets(db, tweets, function(){
            db.close();
            if(tweets || tweets.length > 0) {
              params.oldest = tweets[tweets.length - 1].id - 1;
              getTweets(client, params, callback);
            } else {
              callback();
            }
          })
        } else {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        }
      });
    } else {
      console.log(err);
    }
  });
};

getTweets(client, params, function() {});



//db.mycoll.aggregate(
//   { $sample: { size: 1 } }
//)

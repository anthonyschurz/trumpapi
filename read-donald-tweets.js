var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter(config.twitter);

var params = {screen_name: 'realDonaldTrump'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for(var i in tweets) {
      var tweet = tweets[i];
      console.log(tweet.text);
    }
  }
});

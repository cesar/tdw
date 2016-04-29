/**
* Worker program receives an id as a parameter
* In the setup, the worker process will subscribe to the
* master node and process the incomming tweets
* Considerations: Restart processes upon startup
**/

//If the keyword does not exists, exit
//If the keyword becomes inactive, kill the process.
var socket = require('socket.io-client')('http://localhost:4000/');
var db = require('../database');
require('dotenv').config();
var twit = require('twit');
var keywordID = process.argv[2];
var keywords = '';

db.Keywords.find({_id : keywordID}, function(err, docs){
  if(!err){
    keywords = docs[0].firstParameter;
  }
});

socket.on('tweet', function(tweet){
  processTweet(tweet, keywordID);
})


function processTweet(tweet, keyword){
  if(tweet.text.search(keywords) > 0){
    console.log('Hit: Match found');
    db.Tweets.create({
      tweet : tweet,
      keyword : keyword
    });
  }
}

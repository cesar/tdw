/**
* Worker program receives an id as a parameter
* In the setup, the worker process will subscribe to the
* master node and process the incomming tweets
* Considerations: Restart processes upon startup
**/

//If the keyword does not exists, exit
//If the keyword becomes inactive, kill the process.
var socket = require('socket.io-client')('http://localhost:4000/');
var database = require('../database');

const keyID = process.argv[2];

var keywords = [];

database.Keywords.find({_id: keyID}, function(err, docs){
  if(!err){
    keywords = docs;
  }
});

socket.on('tweet', function(tweet){
    console.log(tweet);
});

function processTweet(tweet) {

}

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
require('dotenv').config();
var twit = require('twit');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//create a twitter stream
var stream = T.stream('statuses/filter');

stream.on('tweet', function(tweet){
  console.log(tweet);
});

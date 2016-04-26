/**
* Master process handles child process creation and gathering of the tweets
* The master process will register a socket connection and
* broadcast incomming tweets to the child processes
*
* Port must be created on the fly and it must not be in use
**/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var database = require('../database');
require('dotenv').config();
var Twit = require('twit');
var forever = require('forever-monitor');

server.listen(4000);

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//create a twitter stream
var stream = T.stream('statuses/sample');

stream.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});

//Start a worker process
app.get('/start/:keywordID', function (req, res) {
  var child = new (forever.Monitor)('worker.js', {
     max: 3,
     silent: true,
     args: [req.params.keywordID]
   });

  child.start();
});

//Kill a worker process
app.get('/kill', function(req, res){

});

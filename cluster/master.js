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
var pm2 = require('pm2');
var fs = require('fs');


var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//create a twitter stream
var stream = T.stream('statuses/sample');

//Broadcast a tweet to all listeners
stream.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});

//Start a worker process
app.get('/start/:id', function (req, res) {
  var file = fs.readFileSync('worker.js');
  fs.writeFileSync(req.params.id + '.js', file);
  
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    pm2.start({
      script    : req.params.id + '.js',         
      max_memory_restart : '200M',
      args : req.params.id
    }, function(err, apps) {
      console.log('Process created');
      pm2.disconnect();   // Disconnect from PM2
      if (err) throw err
      res.sendStatus(200);
    });
  });
});

//Get information on running proccesses
app.get('/list', function(req, res, next){
  pm2.connect(function(err){
    if (err) {
      console.error(err);
      process.exit(2);
    }
    pm2.list(function(err, list){
      if(err) throw err;
      res.json({
       list : list 
      });
    });
  });
});

//Kill a worker process
app.get('/stop/:id', function(req, res){
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    pm2.stop(req.params.id, function(err){
      if(err) throw err;
      res.sendStatus(200);
    })
  });
});



server.listen(4000);
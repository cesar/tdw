/**
* Master process handles child process creation and gathering of the tweets
* The master process will register a socket connection and
* broadcast incomming tweets to the child processes
*
* Port must be created on the fly and it must not be in use
**/
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(4000);

setInterval(broadcast, 5000);

function broadcast(){
  io.emit('tweet', {message : 'Something'});
}

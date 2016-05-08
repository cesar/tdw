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
var keyword = '';

db.Keywords.findOne({_id : keywordID}, function(err, keyword){
  if(!err){
    var params = keyword.parameter;
    socket.on('tweet', function(tweet){
      processTweet(tweet, params, keywordID);
    });
  }
});



console.log(keyword);




// while(true){
//   console.log(keyword);
// }


function processTweet(tweet, keyword, id){
  console.log('miss');
  console.log(keyword);
  if(tweet.text.includes(keyword)){
    db.Tweets.create({ tweet : tweet, keyword : id }, function(err){
      if(!err){ 
        countDate(tweet, id);
      }
    });
  }
}



/**
 * Count tweets per day
 */
function countDate(tweet, id){
  var day = new Date().getDay();
  console.log(day);
  switch(day){
    case(0): //Sunday
      db.Keywords.update({_id : id}, {$inc : { 'sunday' : 1}});
      break;
    case(1): 
      db.Keywords.update({_id : id}, {$inc : { 'monday' : 1}});
      break;
    case(2): 
      db.Keywords.update({_id : id}, {$inc : { 'tuesday' : 1}});
      break;
    case(3): 
      db.Keywords.update({_id : id}, {$inc : { 'wednesday' : 1}});
      break;
    case(4): 
      db.Keywords.update({_id : id}, {$inc : { 'thursday' : 1}});
      break;
    case(5): 
      db.Keywords.update({_id : id}, {$inc : { 'friday' : 1}});
      break;
    case(6): 
      db.Keywords.update({_id : id}, {$inc : { 'saturday' : 1}});
      break;
    default:
      break;
  }
}

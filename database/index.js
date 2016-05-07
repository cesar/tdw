var mongoose = require('mongoose');
require('dotenv').config();
var passportLocalMongoose = require('passport-local-mongoose');


//Connect to the database
mongoose.connect(process.env.DATABASE_URL_DEV);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
  console.log('Database connection succeeded');
});

var keywordSchema = mongoose.Schema({
  firstParameter : String,
  secondParameter : String,
  thirdParameter : String,
  user : String,
  status : Boolean,
  created : Date,
  sunday : Number,
  monday : Number,
  tuesday : Number, 
  wednesday : Number,
  thursday : Number,
  friday : Number,
  saturday : Number,
  cluster : String
});

var tweetSchema = mongoose.Schema({
  tweet : {},
  keyword : String
});


var userSchema = mongoose.Schema({
  username : String,
  password : String
});

userSchema.plugin(passportLocalMongoose);

exports.Users = mongoose.model('Users', userSchema);
exports.Tweets = mongoose.model('Tweets', tweetSchema);
exports.Keywords = mongoose.model('Keywords', keywordSchema);
exports.mongoose = mongoose;

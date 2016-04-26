var db = require('../database');

console.log(db);
//Create a user
var user = new db.Users({
  firstName : 'Cesar',
  lastName : 'Cruz',
  email : 'cesarcruz91@gmail.com',
  password : 'cesar123'
});

user.save(function(err, user){
  if(err){
    console.log(err);
  } else {
    console.log('User added');
  }
});

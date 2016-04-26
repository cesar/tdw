var db = require('../database');

// //Create a user
// var user = new db.Users({
//   firstName : 'Cesar',
//   lastName : 'Cruz',
//   email : 'cesarcruz91@gmail.com',
//   password : 'cesar123'
// });
//
// user.save(function(err, user){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('User added');
//   }
// });

var keywords = new db.Keywords({
  firstParameter : 'zika',
  secondParameter : 'Puerto Rico',
  thirdParameter : 'es',
  user : '1',
  status : true,
  pid : 0
});

keywords.save(function(err, res){
  if(!err){
    console.log('keywords added');
  }
})

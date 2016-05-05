var router = require('express').Router();
var db = require('../database');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next){
  res.render('login');  
});

router.post('/login', passport.authenticate('local', { 
    successRedirect : '/keywords',
    failureRedirect : '/'
}));

//Login user
passport.use(new LocalStrategy(
  function(email, password, done) {
      console.log(email);
    db.Users.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = router;

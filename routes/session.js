var router = require('express').Router();
var db = require('../database');
var passport = require('passport');

router.get('/', function(req, res, next){
  res.render('login');  
});

router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/keywords');
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
  console.log(req.body);
    db.Users.register(new db.Users({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/keywords');
        });
    });
});



module.exports = router;

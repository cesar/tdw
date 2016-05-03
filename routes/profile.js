var router = require('express').Router();
var db = require('../database');

router.get('/profile', function(req, res, next){
  res.render('profile', {user : { firstName : 'Cesar', lastName : 'Cruz'}});
});

router.post('/profile', function(req, res, next){
  
});

module.exports = router;

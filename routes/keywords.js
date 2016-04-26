var express = require('express');
var router = express.Router();
var db = require('../database');

/**
* Get keywords
**/
router.get('/keywords', function(req, res, next){
  db.Keywords.find({}, function(err, keywords){
    if(!err){
      res.render('home', keywords);
    }
  });
});

router.get('/keywords/:id', function(req, res, next) {
  db.Keywords.find({keyword_id : req.params.id}, function(err, tweets){
    if(!err){
      res.render('keyword', tweets);
    }
  });
});

router.post('/keywords', function(req, res, next){

});




module.exports = router;

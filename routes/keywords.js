var express = require('express');
var router = express.Router();
var db = require('../database');

/**
* Get keywords
**/
router.get('/keywords', function(req, res, next){
  db.Keywords.find({}, function(err, keywords){
    if(!err){
      console.log(keywords);
      res.render('index', {title : 'Current Searches', keywords : keywords});
    }
  });
});

router.get('/keywords/new', function(req, res, next){
  res.render('new');
});

router.get('/keywords/:id', function(req, res, next) {
  db.Keywords.find({keyword_id : req.params.id}, function(err, tweets){
    if(!err){
      res.render('keyword');
    }
  });
});

/**
* Create keyword combinations
**/
router.post('/keywords', function(req, res, next){

    db.Keywords.create({
      firstParameter : req.body.firstParameter || '',
      secondParameter : req.body.secondParameter || '',
      thirdParameter : req.body.thirdParameter || '',
      user : 1,
      status : true,
      pid : 0,
      created : Date.now()
    }, function(err, docs){
      if(!err){
        res.redirect('/keywords');
      }
    });

});

router.put('/keywords/:id', function(req, res, next){

});



module.exports = router;

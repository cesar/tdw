var express = require('express');
var router = express.Router();
var db = require('../database');
var http = require('http');

/**
* Get keywords
**/
router.get('/keywords', function(req, res, next){
  db.Keywords.find({}, function(err, keywords){
    if(!err){
      res.render('index', {title : 'Current Searches', keywords : keywords});
    }
  });
});

router.get('/keywords/new', function(req, res, next){
  res.render('new');
});

router.get('/keywords/:id', function(req, res, next) {
  db.Tweets.find({keyword : req.params.id}, function(err, docs){
    if(!err){
      res.render('keyword', {title : 'Some title', tweets : docs});
    }
  })
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
    }, function(err, keyword){
      if(!err){
        http.get('http://localhost:4000/start/' + keyword._id, () => {
          res.redirect('/keywords');
        });
      }
    });

});

router.put('/keywords/:id', function(req, res, next){
  
});



module.exports = router;

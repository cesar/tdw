var express = require('express');
var router = express.Router();
var db = require('../database');
var http = require('http');

/**
* Get keywords
**/
router.get('/keywords', function(req, res, next){
  db.Keywords.find({}, function(err, keywords){
    console.log(err);
    if(!err){
      res.render('index', {title : 'Current Searches', keywords : keywords});
    }
  });
});

router.get('/keywords/new', function(req, res, next){
  res.render('new');
});

router.get('/keywords/:id', function(req, res, next) {
  var data = {}, stats = { languages : [], langCount : []};
  db.Keywords.findOne({_id : req.params.id}, function(err, keyword){
    db.Tweets.find({keyword : req.params.id}, function(err, tweets){
        data.title = 'Active Search';
        data.keyword = keyword;
        data.tweets = tweets;
        res.render('keyword', { data : data});
    });
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
      created : Date.now(),
      sunday : 0,
      monday : 0,
      tuesday : 0,
      wednesday : 0,
      thursday : 0,
      friday : 0,
      saturday : 0
    }, function(err, keyword){
      if(!err){
        http.get('http://localhost:4000/start/' + keyword._id, () => {
          res.redirect('/keywords');
        });
      }
    });

});

router.put('/keywords/:id', function(req, res, next){
  if(req.body.action === 'start'){
    http.get('http://localhost:4000/restart/' + req.params.id, () => {
      res.redirect('/keywords');
    });
  } else if(req.body.action === 'stop'){
    http.get('http://localhost:4000/stop/' + req.params.id, () => {
      res.redirect('/keywords');
    });
  } else {
    res.redirect('index');
  }
});








module.exports = router;

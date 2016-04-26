var router = require('express').Router();

router.get('/search', function(req, res, next){
  res.render('search');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/home', function(req, res, next) {
  console.log('getting called');
  res.render('index');
});



module.exports = router;

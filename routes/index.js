  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  //localhost:3000
  router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send('Hello World from Express');
  });
  //localhost:3000
  router.get('/home', function(req, res, next) {
    res.send('This is the home page');
    // res.render('index', { title: 'Express' });
  });


  module.exports = router;


  //mongodb

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res) {
});

router.get('/twitter/request-token', function(req, res) {
});

module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res) {
});

//handle sign-in
router.get('/twitter/login', passport.authenticate('twitter', {
    failureRedirect: '/',
    session: true
}));

router.get('/twitter/return', function(req, res) {
//    res.redirect('/options');
    console.log(req.user);
    res.render('return', { user: req.user.username });
});

module.exports = router;

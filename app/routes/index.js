var express = require('express');
var router = express.Router();

var Twitter = require("node-twitter-api");
var keys = require("../../keys.js")

var twitter = new Twitter({
	consumerKey: keys['consumer_key'],
	consumerSecret: keys['consumer_secret'],
        callback: 'http://ec2-52-43-207-96.us-west-2.compute.amazonaws.com:3000/twitter/return'
});

var _requestSecret

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res) {
});

//handle sign-in
router.get('/twitter/login', function(req, res) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err) {
	    res.status(500).send(err);
	}
	else {
	    _requestSecret = requestSecret;
	    res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
	}
    })
});

router.get('/twitter/return', function(req, res) {
//    res.redirect('/options');
    var requestToken = req.query.oauth_token;
    var verifier = req.query.oauth_verifier;

    twitter.getAccessToken(requestToken, _requestSecret, verifier,
	function(err, accessToken, accessSecret) {
	    if (err) {
	        res.status(500).send(err);
            }
	    else {
		twitter.verifyCredentials(accessToken, accessSecret,
		    function(err, user) {
                        if (err) {
                            res.status(500).send(err);
			}
                        else {
	                    res.render('return', { user: user.name });
			    twitter.account("update_profile", {
			        name: "Test"
			    },
		            accessToken,
			    accessSecret,
			    function(error, data, response) {
				if (error) {
				    res.status(500).send(err);
			        }
				else {
				    console.log(data);
				}
			    });
			}
                    });
	    }
        });
});

module.exports = router;

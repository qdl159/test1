var express = require('express');
var router = express.Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test')
var Q = require('q');
var passport = require('passport');
var Account = require('../models/account');

router.post('/', function(req, res, next){
	console.log('login post', req.body);
	//for login and register
	var user = req.body;
	console.log('post user', user);
	Account.register(
		new Account({
			username: user.username
		}), 
		user.password, 
		function(err, account){
			console.log('after save', err, account);
			if(err) {
				res.json({})
			} else {
				passport.authenticate('local')(req, res, function(){
					res.json(
						{
							username: account.username
					})
				});
			}
		});
});

router.get('/', function(req, res, next){
	// var username;
	// if (req.session.user) username = req.session.user.name;
	// res.json({username: username})
	if (req.user) {
		res.json({username: req.user.username});
	} else {
		res.json({})
	}
});

router.get('/logout', function(req, res, next){
	req.session.destroy(function(){
		res.json({})
	})
});

module.exports = router;

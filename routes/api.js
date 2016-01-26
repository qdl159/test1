var express = require('express');
var router = express.Router();
var MongoClient = require('Mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db = MongoClient.connect('mongodb://localhost/test')


/* GET home page. */
router.get('/user', function(req, res, next) {
    db.then(function(db){
		return db.collection('customer').find().toArray()
	}).then(res.json.bind(res)).catch(function(err){
		console.log(err);
		next(err);
	})
});

router.post('/user', function(req, res, next) {
	var user = req.body;
	console.log('add user', req.body);
    db.then(function(db){
		return db.collection('customer').insert(user)
	})
	.then(function(){
		console.log('after add', user, req.xhr);
		res.json({
			user: user
		});
	})
	.catch(function(err){
		console.log(err);
		next(err);
	})
});

router.delete('/user/:userid', function(req, res, next) {
	var userid = ObjectId(req.params.userid);
	var user = req.body;
    db.then(function(db){
		return db.collection('customer').remove({_id: userid})
	})
	.then(res.json.bind(res))
	.catch(function(err){
		console.log(err);
		next(err);
	})
});


router.put('/user', function(req, res, next) {
	var user = req.body;
	var uid = user._id;
	delete user._id;
    db.then(function(db){
		return db.collection('customer').update({_id:ObjectId(uid)}, user)
	})
	.then(function(){
		user._id = uid;
		res.json({
			user: user
		});
	})
	.catch(function(err){
		console.log(err);
		next(err);
	})
});



router.post('/user', function(){});


module.exports = router;



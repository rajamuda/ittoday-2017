var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var sequelize = require('../connection');

var User = sequelize.import(__dirname + "/../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({status: false, message: 'none API implemented'});
});

/* POST user registration. */
router.post('/register', function(req, res) {
  console.log(req.body);
  var nama_user = req.body.nama_user;
  var email_user = req.body.email_user;
  var password_user = crypto.createHash('sha256').update(req.body.password_user).digest('hex');

  User
  	.build({nama_user: nama_user, email_user: email_user, password_user: password_user})
  	.save()
  	.then(function() {
  		console.log('User built successfully');
      res.json({status: true, message: "Register Succes!"});
  	})
  	.catch(function(err) {
      res.json({status: false, message: "Register failed"});
  		console.log(err);
  	})
});

module.exports = router;

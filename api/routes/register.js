var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('ittodayw_2017', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.import(__dirname + "/../models/user");

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body);
  var nama_user = req.body.nama_user;
  var email_user = req.body.email_user;
  var password_user = crypto.createHash('sha256').update(req.body.password_user).digest('hex');

  User
  	.build({nama_user: nama_user, email_user: email_user, password_user: password_user})
  	.save()
  	.then(function() {
  		console.log('User built successfully');
  	})
  	.catch(function(err) {
  		console.log(err);
  	})
});

module.exports = router;
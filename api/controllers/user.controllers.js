var express = require('express');
var crypto = require('crypto');

var sequelize = require('../connection');
var jwt = require('../token');

var User = sequelize.import(__dirname + "/../models/user.models");

function UserControllers(){
	this.register = function(data, res){
	  	var nama_user = data.nama_user;
	  	var email_user = data.email_user;
	  	var password_user = crypto.createHash('sha256').update(data.password_user).digest('hex');
	  	var password_confirm = data.password_lagi;

	  	if (!nama_user || !email_user || !password_user || !password_confirm) {
	    	res.json({status: false, message: "There is empty field!", err_code: 406});
	  	} else if (password_user != password_confirm) {
	  		res.json({status: false, message: "Confirmation password does not match", err_code: 406});
	  	} else {
	    	User
	    		.create({nama_user: nama_user, email_user: email_user, password_user: password_user})
	    		.then(function() {
	    			console.log('User built successfully');
	        		res.json({status: true, message: "Register Success!"});
	    		})
	    		.catch(function(err) {
	        		res.json({status: false, message: "Register failed", err_code: 400});
	    			console.log(err);
	    		})
	  	}
	}

	this.login = function(data, res){
	  	console.log(data);
	  	var email_user = data.email_user;
	  	var password_user = crypto.createHash('sha256').update(data.password_user).digest('hex');
	  	var remember_me = data.remember_me;
	  	User
	    	.findAll({
	      		where: { email_user: email_user, password_user: password_user }
	    	})
	    	.then(function(user) {
		      	if (!user.length) {
			        res.json({status: false, message: "Wrong email or password"});
		      	} else {
		        	var signInTime = Math.floor(Date.now()/1000); // iat
		        	var expired;
		        	if (remember_me == true) {
		          		expired = 99999999999;
		        	} else {
		          		expired = signInTime + (2*60*60) // exp after 2 hours
		        	}
		        	var data = { id: user[0].id, nama_user: user[0].nama_user, email_user: user[0].email_user, tingkat_user: user[0].tingkat_user, iat: signInTime, exp: expired }
		        	var token = jwt.createToken(data);
		        	res.json({status: true, message: "Login success!", token: token});
		      	}
	    	})
	    	.catch(function(err) {
	      		res.json({status: false, message: "Login failed!", err: err});
	    	})
	}

	this.session = function(data, res){
  	  	jwt.checkToken(data);
	}

	this.editprofile = function(data, res) {
		var auth = jwt.validateToken(req, res);
	  	if (auth == false) {
	    	res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
	   	} else {
	    	var id_user = auth.id; 
	    	var nama_user = data.nama_user;
	    	var telepon_user = data.telepon_user;
		    var kelamin_user = data.kelamin_user;
		    var tingkat_user = data.tingkat_user;
		    var institusi_user = data.institusi_user;
		    var alamat_user = data.alamat_user;

	    	if (!nama_user || !telepon_user || !kelamin_user || !tingkat_user || !institusi_user || !alamat_user) {
	      		res.json({status: false, message: 'There is empty field!', err_code: 406});
	    	} else {
		      	User
		        	.update({
		        		nama_user: nama_user,
		        		telepon_user: telepon_user,
		        		kelamin_user: kelamin_user,
		        		tingkat_user: tingkat_user,
		        		institusi_user: institusi_user,
		        		alamat_user: tinggal_user,
		        		status_user: true
		        	}, {
		        		where: { id: id_user }
		        	})
		        	.then(function() {
		          		res.json({status: true, message: 'Success!'});
		        	})
		        	.catch(function(err) {
		          		res.json({status: false, message: "Registration failed", err: err});
		        	})
		    }
	    }
  	}

	this.showprofile = function(id, header, res){
		var auth = jwt.validateToken(header, res);
		if (auth == false) {
	    	res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});			
		} else {
	    	if(auth.id != id) {
	   			res.json({status: false, message: 'Access Denied', err_code: 403});			
	    	} else {
		    	User
		    		.findAll({
		    			where: { id: id, email_user: auth.email_user },
		    			attributes: ['nama_user', 'kelamin_user', 'telepon_user', 'tingkat_user', 'institusi_user', 'alamat_user']
		    		})
		    		.then(function(user){
		    			res.json({status: true, message: "Retrieve data success", data: user});					
		    		})
		    		.catch(function(err) {
				      res.json({status: false, message: "Retrieve data failed", err: err});
				    })
	    	}
		}
	}
}

module.exports = new UserControllers();
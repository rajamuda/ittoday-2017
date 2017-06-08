var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var sequelize = require('../connection');
var jwt = require('../token');
var mailer = require('../mailer.js');

var User = sequelize.import(__dirname + "/../models/user.models");

var validateEmail = function(mail){
	var regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return mail.match(regexMail);
}

function UserControllers(){
	this.register = function(data, res){
	  	var nama_user = data.nama_user;
	  	var email_user = data.email_user;
	  	var password_user = data.password_user;
	  	var password_confirm = data.password_lagi;

	  	if (!nama_user || !email_user || !password_user || !password_confirm) {
	    	res.json({status: false, message: "There is empty field!", err_code: 406});
	  	} else if (password_user != password_confirm) {
	  		res.json({status: false, message: "Confirmation password does not match", err_code: 406});
	  	} else if(!validateEmail(email_user)) {
  			res.json({status: false, message: 'Not valid e-mail syntax', err_code: 406});
  		} else if(password_user.length < 6) {
  			res.json({status: false, message: 'Password must have at least 6 characters', err_code: 406});
  		} else {
	    	User
	    		.create({nama_user: nama_user, email_user: email_user, password_user: crypto.createHash('sha256').update(password_user).digest('hex')})
	    		.then(function() {
	    			console.log('User '+nama_user+' successfully registered');
	        		res.json({status: true, message: "Register Success!"});
	    		})
	    		.catch(function(err) {
	        		res.json({status: false, message: "Register failed", err_code: err.parent.errno});
	    			console.log(err);
	    		})
	  	}
	}

	this.loginadmin = function(data, res){
		var email_admin = data.email_admin;
		var password_admin = data.password_admin;

		if (email_admin == 'admin@ittoday' && password_admin == '@ithariinikreatif') {
			var signInTime = Math.floor(Date.now()/1000); // iat
    		var expired = signInTime + (1*60*60);
    		var data = { id: '0', role: 'admin', iat: signInTime, exp: expired };
    		var token = jwt.createToken(data);
    		res.json({status: true, message: "Authenticated!", token: token});
		} else {
			res.json({status: false, message: "Wrong email or password"});
		}
	}

	this.login = function(data, res){
  	var email_user = data.email_user;
  	var password_user = crypto.createHash('sha256').update(data.password_user).digest('hex');
  	var remember_me = data.remember_me;

  	if(!validateEmail(email_user)) {
  		res.json({status: false, message: 'Not valid e-mail syntax', err_code: 406});
  	} else {
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
		        	var data = { id: user[0].id, role: 'user', email_user: user[0].email_user, iat: signInTime, exp: expired };
		        	var token = jwt.createToken(data);
		        	res.json({status: true, message: "Login success!", token: token});
		      	}
	    	})
	    	.catch(function(err) {
	      		res.json({status: false, message: "Login failed!", err: err});
	    	})
	  }
	}

	this.session = function(data, res){
		jwt.checkToken(data, res);
	}

	this.editprofile = function(data, header, res) {
		var auth = jwt.validateToken(header, res);
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
		    var identitas_user = data.identitas_user;
		    var check_telepon = parseInt(telepon_user);

	    	if (!nama_user || !telepon_user || !kelamin_user || !tingkat_user || !institusi_user || !identitas_user || !alamat_user) {
      		res.json({status: false, message: 'There is empty field!', err_code: 406});
	    	} else if(check_telepon < 0 || check_telepon.length < 11){
		    	res.json({status: false, message: 'Not valid mobile phone number', err_code: 406});
		    } else {
		      	User
		        	.update({
		        		nama_user: nama_user,
		        		telepon_user: telepon_user,
		        		kelamin_user: kelamin_user,
		        		tingkat_user: tingkat_user,
		        		institusi_user: institusi_user,
		        		identitas_user: identitas_user,
		        		alamat_user: alamat_user,
		        		status_user: true
		        	}, {
		        		where: { id: id_user }
		        	})
		        	.then(function() {
		          		res.json({status: true, message: 'Update profile success!'});
		        	})
		        	.catch(function(err) {
		          		res.json({status: false, message: "Update profile failed", err: err});
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
		    			attributes: ['nama_user', 'kelamin_user', 'telepon_user', 'tingkat_user', 'institusi_user', 'alamat_user', 'identitas_user', 'status_user']
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

	this.uploadID = function(req, res){
		var auth = jwt.validateToken(req.headers, res);
		var destination = '/uploads/identitas/';
		var dir = '/../views';
		var filename;

		var storage = multer.diskStorage({ //multers disk storage settings
		  destination: function (req, file, cb) {
		      cb(null, __dirname+dir+destination)
		  },
		  filename: function (req, file, cb) {
		      var date = new Date();

					filename =  file.fieldname + auth.id + '-' + (date.getMonth()+1) + date.getDate() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
		      cb(null, filename)
		  }
		});

		var upload = multer({ //multer settings
		    storage: storage,
		    fileFilter: function (req, file, cb) {
		        var ext = path.extname(file.originalname);

		        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
		        		req.fileValidateError = "Only images are allowed";
		            return cb(new Error('Only images are allowed'))
		        }
		        cb(null, true)
		    },
		    limits: { fileSize: 2*1024*1024 } //2 MiB
		}).single('idcard');
		
		if(auth == false){
			res.json({status: false, message: "Authentication failed, please login again", err_code: 401});
		}else{
			upload(req, res, function(err){
				// console.log(req.fileValidateError);
				if(req.fileValidateError){
					res.json({status: false, message: req.fileValidateError});
				}else if(err){
					if(err.code == 'LIMIT_FILE_SIZE')
						res.json({status: false, message: 'File size limit exceeded'});
					else
						res.json({status: false, err: err});
				}else{
					res.json({status: true, message: 'Upload success', filelocation: destination+filename});
				}
			})
		}
	}

	this.resetpass = function(req, res) {
		var mail = req.body.email_user;

		console.log(req.body);

		if(!mail){
			res.json({status: false, message: 'Please input your e-mail'});
		}else{
			var generateToken = function(){
				var text = "";
			  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=&!@#$-_";

			  for( var i=0; i < 7; i++ )
			    text += possible.charAt(Math.floor(Math.random() * possible.length));

			  return text;
			}

			User
				.findOne({
						where: {
							email_user: mail
						}
				}).then(function(result){
					if (result != null) {
						let token = generateToken();
						User
							.update({
								token_forgetpass_user: token
							}, { 
								where: { email_user: mail }
							}).then(function(){
									let options = {
										mailto: mail,
										subject: 'Reset Password',
										template: 'reset_pass',
										customVar: token
									}
									mailer.sendMail(options, res);
							}).catch(function(err){
								res.json({status: false, message: 'Mail Failed'});
							});
					} else {
						res.json({status: false, message: 'User with this e-mail does not exist'});
					}
				}).catch(function(err){
					res.json({status: false, message: 'Mail Failed'});
				});
		}
	}

	this.confirmresetpass = function(req, res){
		var auth = req.headers.authorization;
		var new_pass = req.body.pass_baru;
		var new_pass_confirm = req.body.pass_baru2;
		var check_token_only = req.body.check_token_only;

		console.log(check_token_only);

		if(!auth){
			res.json({status: false, message: 'Access Denied!'});
		}else if(!check_token_only && (!new_pass || !new_pass_confirm)){
			res.json({status: false, message: 'Please, fill all fields'});
		}else if(!check_token_only && new_pass != new_pass_confirm){
			res.json({status: false, message: 'Password and confirmation password does not match'});
		}else if(!check_token_only && new_pass.length < 6){
			res.json({status: false, message: 'Password must have at least 6 characters'});
		}else{
			User
				.findOne({
					where: {
						token_forgetpass_user: auth
					}, attributes: ['nama_user', 'email_user']
				}).then(function(result){
					if(result!=null){
						if(check_token_only){
							res.json({status: true, message: 'Reset password token valid', data: result});
						}else{
							User
								.update({
									password_user: crypto.createHash('sha256').update(new_pass).digest('hex'),
									token_forgetpass_user: null
								}, {
									where: {token_forgetpass_user: auth}
								}).then(function(){
									res.json({status: true, message: 'Password succesfully reset'});
								}).catch(function(err){
									res.json({status: false, message: 'Reset password failed'});
								})
						}
					}else{
						res.json({status: false, message: 'Wrong reset password token'});
					}
				}).catch(function(err){
					res.json({status: false, message: 'Reset password failed'});
				})
		}
	}
}

module.exports = new UserControllers();
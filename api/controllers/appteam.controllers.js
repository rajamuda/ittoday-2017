var express = require('express');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

var fs = require('fs');

var AppTeam = sequelize.import(__dirname + "/../models/appteam.models");
var User = sequelize.import(__dirname + "/../models/user.models");

function AppTeamControllers() {
	// hanya admin yang bisa dapat list
	this.getAll = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			AppTeam
				.findAll({order: [['createdAt', 'DESC']]})
				.then(function(result) {
					// console.log('Get all appteam successful!');
					res.json({status: true, message: 'Get all appteam success', data: result});
				})
				.catch(function(err) {
					// console.log('Failed to get all appteam!');
					res.json({status: false, message: "Get all appteam failed!", err_code: 400, err: err});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	/* Get Team Info */
	this.get = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.params.id; // id user

		if (auth == false || auth.id != id) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			AppTeam
				.findOne({
					where: {
						$or: [
							{ketua_team: auth.id},
							{anggota1_team: auth.id},
							{anggota2_team: auth.id}
						]
					}
				})
				.then(function(result) {
					// console.log('Get all news successful!');
					if(result == null) {
						res.json({status: false, message: 'No appteam with this ID'});
					} else {
						User
							.findAll({
								where: {
									$or: [
										{id: result.ketua_team},
										{id: result.anggota1_team},
										{id: result.anggota2_team}
									]
								},
								attributes: ['id', 'nama_user']
							})
							.then(function(info) {
								var ketuaIndex = info.findIndex(x => x.id == result.ketua_team);
								var infoKetua = info.splice(ketuaIndex,1);
								res.json({status: true, message: 'Get appteam success', data: result, leader: infoKetua, member: info});
							})
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Not yet registered", err_code: 400});
				});
		}
	}

	/* Get FULL Team Info (admin only) */
	this.getById = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.params.id; //id team

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			AppTeam
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					// console.log('Get all news successful!');
					if(result == null) {
						res.json({status: false, message: 'No appteam with this ID'});
					} else {
						User
							.findAll({
								where: {
									$or: [
										{id: result.ketua_team},
										{id: result.anggota1_team},
										{id: result.anggota2_team}
									]
								},
								attributes: ['id', 'nama_user', 'email_user', 'kelamin_user', 'telepon_user', 'tingkat_user', 'institusi_user', 'alamat_user', 'identitas_user', 'status_user']
							})
							.then(function(info) {
								var ketuaIndex = info.findIndex(x => x.id == result.ketua_team);
								var infoKetua = info.splice(ketuaIndex,1);

								res.json({status: true, message: 'Get appteam success', data: result, leader: infoKetua, member: info});
							})
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Not yet registered", err_code: 400});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	/* Get Team Info by Token */
	this.getByToken = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var token_team = req.body.token_team;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			AppTeam
				.findOne({
					where: {
						token_team: token_team
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Get appteam by token success', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Get appteam by token failed!", err_code: 400, err: err});
				});
		}
	}

	/* Register User into existed team */
	this.registerMember = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var token_team = req.body.token_team;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			AppTeam
				.findOne({
					where: {
						token_team: token_team
					}
				})
				.then(function(appteam) {
					if (!appteam) {
						res.json({status: false, message: "Wrong Team Token or Team Token does not exist"});
					} else {
						if (appteam.anggota1_team == null) {
							AppTeam
								.update({
									anggota1_team: auth.id
								},{
									where: {
										token_team: token_team
									}
								})
								.then(function() {
									res.json({status: true, message: "Member registration to appteam success!"});
								})
								.catch(function(err) {
									res.json({status: false, message: "Member registration to appteam failed!", err_code: 400});	
								});
						} else if (appteam.anggota2_team == null) {
							AppTeam
								.update({
									anggota2_team: auth.id
								},{
									where: {
										token_team: token_team
									}
								})
								.then(function() {
									res.json({status: true, message: "Member registration to appteam success!"});
								})
								.catch(function(err) {
									res.json({status: false, message: "Member registration to appteam failed!", err_code: 400});	
								});
						} else {
							res.json({status: false, message: 'Appteam member full!', err_code: 400})
						}
					} 
				})
		}
	}

	/* Register new team */
	this.create = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var nama_team = req.body.nama_team;
		var ketua_team = auth.id;
		var token_mentah = 'ittoday2017-appteam-';
		token_mentah += ketua_team.toString();
		var token_team = crypto.createHash('sha256').update(token_mentah).digest('base64');

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			AppTeam
				.create({
						ketua_team: ketua_team,
						nama_team: nama_team,
						token_team: token_team
				})
				.then(function() {
					// console.log("Create appteam success");
					res.json({status: true, message: "Register AppToday success!", token_team: token_team});
				})
				.catch(function(err) {
					// console.log('Failed to create appteam!');
					res.json({status: false, message: "Register AppToday failed!", err_code: err.parent.errno});
				})
		}
		
	}

	/* AppsToday submission */
	this.submission = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var nama_app = req.body.nama_app;
		var proposal_app = req.body.proposal_app;
		var video_app = req.body.video_app;
		// var link_app = req.body.link_app;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			AppTeam
				.update({
					nama_app: nama_app,
					proposal_app: proposal_app,
					video_app: video_app
				}, {
					where: {
						$or: [
							{ketua_team: auth.id},
							{anggota1_team: auth.id},
							{anggota2_team: auth.id}
						]
					}
				}).then(function() {
					// console.log("Create appteam success");
					res.json({status: true, message: "Submission success!"});
				}).catch(err => {
					// console.log('Failed to create appteam!');
					res.json({status: false, message: "Submission failed!", err_code: err});
				})
		}
	}

	this.uploadProposal = function(req, res){
		var auth = jwt.validateToken(req.headers, res);
		var destination = '/uploads/proposal/';
		var dir = '/../views';
		var filename;
		var team = req.headers.team;

		var MAGIC_NUMBERS = {
		    pdf: '25504446'
		}

		var storage = multer.diskStorage({ //multers disk storage settings
		  destination: function (req, file, cb) {
		      cb(null, __dirname+dir+destination)
		  },
		  filename: function (req, file, cb) {
		      var date = new Date();

					filename =  file.fieldname + '_' + team + '-' + date.getTime() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
		      cb(null, filename)
		  }
		});

		var upload = multer({ //multer settings
		    storage: storage,
		    fileFilter: function (req, file, cb) {
		        var ext = path.extname(file.originalname);

		        if(file.mimetype != 'application/pdf') {
		        		req.fileValidateError = "Only PDF is allowed";
		            return cb(new Error('Only PDF is allowed'))
		        }
		        cb(null, true)
		    },
		    limits: { fileSize: 5*1024*1024 } //5 MiB
		}).single('proposal');

		var checkMagicNumbers = function(magic) {
			if (magic == MAGIC_NUMBERS.pdf) 
				return true
		}
		
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
					var upload_pdf = fs.readFileSync(__dirname+dir+destination+filename).toString('hex',0,4);

					if(!checkMagicNumbers(upload_pdf)){
						fs.unlinkSync(__dirname+dir+destination+filename);
						res.json({status: false, message: 'Oops, REAL pdf only, please!'});
					}else{
						res.json({status: true, message: 'Upload success', filelocation: destination+filename});
					}
				}
			})
		}
	}

	this.uploadPayment = function(req, res){
		var auth = jwt.validateToken(req.headers, res);
		var destination = '/uploads/payment/';
		var dir = '/../views';
		var filename;
		var team = req.headers.team;

		var MAGIC_NUMBERS = {
		    jpg: 'ffd8ffe0',
		    jpg1: 'ffd8ffe1',
		    png: '89504e47'
		}

		var storage = multer.diskStorage({ //multers disk storage settings
		  destination: function (req, file, cb) {
		      cb(null, __dirname+dir+destination)
		  },
		  filename: function (req, file, cb) {
		      var date = new Date();

					filename =  file.fieldname + '_' + team + '-' + date.getTime() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
		      cb(null, filename)
		  }
		});

		var upload = multer({ //multer settings
		    storage: storage,
		    fileFilter: function (req, file, cb) {
		        var ext = path.extname(file.originalname).toLowerCase();
		        // console.log("extension: "+ext);
		        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg' && ext != '.jpg' && ext != '.png' && ext != '.jpeg') {
		        		req.fileValidateError = "Only images are allowed";
		            return cb(new Error('Only images are allowed'))
		        }
		        cb(null, true)
		    },
		    limits: { fileSize: 2*1024*1024 } //2 MiB
		}).single('payment');
		
		var checkMagicNumbers = function(magic) {
			if (magic == MAGIC_NUMBERS.jpg || magic == MAGIC_NUMBERS.jpg1 || magic == MAGIC_NUMBERS.png) 
				return true
		}
		
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
					var upload_pay = fs.readFileSync(__dirname+dir+destination+filename).toString('hex',0,4);

					if(!checkMagicNumbers(upload_pay)){
						fs.unlinkSync(__dirname+dir+destination+filename);
						res.json({status: false, message: 'Oops, REAL image only, please!'});
					}else{
						AppTeam
							.update({
								pembayaran_app: destination+filename
							}, {
								where: {
									$or: [
										{ketua_team: auth.id},
										{anggota1_team: auth.id},
										{anggota2_team: auth.id}
									]
								}
							}).then(function(){
								res.json({status: true, message: 'Upload bukti pembayaran berhasil'});
							}).catch(function(err){
								res.json({status: false, message: "Upload bukti pembayaran gagal", err_code: err});
							})
					}
				}
			})
		}
	}

	/* AppsToday disqualify team (admin only) */
	this.disqualify = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;
		var status = req.body.status;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else if (auth.role == 'admin') {
			AppTeam
				.update({
					diskualifikasi_team: status,
				},{
					where: {
						id: id
					}
				})
				.then(function(){
					res.json({status: true, message: 'Success'});
				})
				.catch(function(){
					res.json({status: false, message: "Failed!", err_code: 400});
				})
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.qualify = function(req, res){
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;
		var qualify = req.body.qualify; /* 'FINAL' or 'SEMIFINAL' */
		var status = req.body.status;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else if (auth.role == 'admin') {
			if(qualify === 'FINAL'){
				AppTeam
					.update({
						finalis_team: status,
					},{
						where: {
							id: id
						}
					})
					.then(function(){
						res.json({status: true, message: 'Success'});
					})
					.catch(function(){
						res.json({status: false, message: "Failed", err_code: 400});
					})
			}else if(qualify == 'SEMIFINAL'){
				AppTeam
					.update({
						semifinalis_team: status,
					},{
						where: {
							id: id
						}
					})
					.then(function(){
						res.json({status: true, message: 'Success'});
					})
					.catch(function(){
						res.json({status: false, message: "Failed", err_code: 400});
					})
			}
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.sendCustomMail = function(req, res){
		var count = 0;
		var str = "";
		
		for(i=0; i<4; i++){
			if(opt.mailto[i]) str += opt.mailto[i];
			if(i!=3 && opt.mailto[i+1]) str += ", ";
		}
	}

}

module.exports = new AppTeamControllers();
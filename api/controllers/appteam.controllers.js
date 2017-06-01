var express = require('express');

var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

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
								var infoKetua = info.splice(ketuaIndex);
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
								attributes: ['id', 'nama_user', 'kelamin_user', 'telepon_user', 'tingkat_user', 'institusi_user', 'alamat_user', 'identitas_user', 'status_user']
							})
							.then(function(info) {
								var ketuaIndex = info.findIndex(x => x.id == result.ketua_team);
								var infoKetua = info.splice(ketuaIndex);
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
		var proposal_app = req.proposal_app;
		var video_app = req.body.video_app;
		var link_app = req.body.link_app;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			AppTeam
				.update({
					nama_app: nama_app,
					proposal_app: proposal_app,
					video_app: video_app,
					link_app: link_app
				}, {
					where: {
						$or: [
							{ketua_team: auth.id},
							{anggota1_team: auth.id},
							{anggota2_team: auth.id}
						]
					}
				})
		}
	}

	/* AppsToday delete team (admin only) */
	this.delete = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;
		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else if (auth.role == 'admin') {
			AppTeam
				.destroy({
					where: {
						id: id
					}
				})
				.then(function(){
					res.json({status: true, message: 'Delete appteam success'});
				})
				.catch(function(){
					res.json({status: false, message: "Delete appteam failed!", err_code: 400});
				})
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

}

module.exports = new AppTeamControllers();
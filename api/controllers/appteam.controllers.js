var express = require('express');

var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

var AppTeam = sequelize.import(__dirname + "/../models/appteam.models");

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

	this.get = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		if (auth == false) {
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
					}
					else {
						res.json({status: true, message: 'Get appteam success', data: result});
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Get appteam failed!", err_code: 400});
				});
		}
	}

	this.getById = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
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
					}
					else {
						res.json({status: true, message: 'Get appteam success', data: result});
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Get appteam failed!", err_code: 400});
				});
		}
	}


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
					} else if (hackteam.anggota2_team == null) {
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
				})
		}
	}

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
				.findOrCreate({
					where: {
						ketua_team: ketua_team,
						defaults: {
							nama_team: nama_team,
							token_team: token_team
						}
					}
				})
				.then(function() {
					// console.log("Create appteam success");
					res.json({status: true, message: "Create appteam success!"});
				})
				.catch(function(err) {
					// console.log('Failed to create appteam!');
					res.json({status: false, message: "Create appteam failed!", err_code: 400});
				})
		}
		
	}

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
							{ketua_team: auth.id}
							{anggota1_team: auth.id},
							{anggota2_team: auth.id},
						]
					}
				})
		}
	}

	this.delete = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;
		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
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
		}
	}

module.exports = new AppTeamControllers();
var express = require('express');

var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

var HackTeam = sequelize.import(__dirname + "/../models/hackteam.models");
var User = sequelize.import(__dirname + "/../models/user.models");

function HackTeamControllers() {
	// hanya admin yang bisa dapat list
	this.getAll = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			HackTeam
				.findAll({order: [['createdAt', 'DESC']]})
				.then(function(result) {
					// console.log('Get all hackteam successful!');
					res.json({status: true, message: 'Get all hackteam success', data: result});
				})
				.catch(function(err) {
					// console.log('Failed to get all hackteam!');
					res.json({status: false, message: "Get all hackteam failed!", err_code: 400, err: err});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.get = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.params.id;

		if (auth == false || auth.id != id) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			HackTeam
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
						res.json({status: false, message: 'No hackteam with this ID'});
					}
					else {
						res.json({status: true, message: 'Get hackteam success', data: result});
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Not yet registered", err_code: 400});
				});
		}
	}

	this.getById = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.params.id;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			HackTeam
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					// console.log('Get hackteam successful!');
					if(result == null) {
						res.json({status: false, message: 'No hackteam with this ID'});
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
								res.json({status: true, message: 'Get hackteam success', data: result, member: info});
							})
					}
				})
				.catch(function(err) {
					// console.log('Failed to get hackteam!');
					res.json({status: false, message: "Not yet registered", err_code: 400});
				});
		}
	}

	this.getByToken = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var token_team = req.body.token_team;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			HackTeam
				.findOne({
					where: {
						token_team: token_team
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Get hackteam by token success', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Get hackteam by token failed!", err_code: 400, err: err});
				});
		}
	}

	this.registerMember = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var token_team = req.body.token_team;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			HackTeam
				.findOne({
					where: {
						token_team: token_team
					}
				})
				.then(function(hackteam) {
					if (hackteam.anggota1_team == null) {
						HackTeam
							.update({
								anggota1_team: auth.id
							},{
								where: {
									token_team: token_team
								}
							})
							.then(function() {
								res.json({status: true, message: "Member registration to hackteam success!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Member registration to hackteam failed!", err_code: 400});	
							});
					} else if (hackteam.anggota2_team == null) {
						HackTeam
							.update({
								anggota2_team: auth.id
							},{
								where: {
									token_team: token_team
								}
							})
							.then(function() {
								res.json({status: true, message: "Member registration to hackteam success!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Member registration to hackteam failed!", err_code: 400});	
							});
					} else {
						res.json({status: false, message: 'Hackteam member full!', err_code: 400})
					} 
				})
		}
	}

	this.create = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var nama_team = req.body.nama_team;
		var ketua_team = auth.id;
		var token_mentah = 'ittoday2017-hackteam-';
		token_mentah += ketua_team.toString();
		var token_team = crypto.createHash('sha256').update(token_mentah).digest('base64');

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			HackTeam
				.create({
						ketua_team: ketua_team,
						nama_team: nama_team,
						token_team: token_team
				})
				.then(function() {
					// console.log("Create hackteam success");
					res.json({status: true, message: "Register HackToday success!", token_team: token_team});
				})
				.catch(function(err) {
					// console.log('Failed to create hackteam!');
					res.json({status: false, message: "Register HackToday failed!", err_code: 400});
				})
		}
		
	}

	this.delete = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;
		if (auth == false) {
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		} else {
			HackTeam
				.destroy({
					where: {
						id: id
					}
				})
				.then(function(){
					res.json({status: true, message: 'Delete hackteam success'});
				})
				.catch(function(){
					res.json({status: false, message: "Delete hackteam failed!", err_code: 400});
				})
		}
	}
}

module.exports = new HackTeamControllers();
var express = require('express');

var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

var Seminar = sequelize.import(__dirname + "/../models/seminar.models");
var User = sequelize.import(__dirname + "/../models/user.models");

User.hasOne(Seminar, {
  foreignKey: {
    name: 'pendaftar_seminar'
  }
});
Seminar.belongsTo(User, {
	foreignKey: {
		name: 'pendaftar_seminar'
	}
});

function SeminarControllers() {
	this.getAll = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			Seminar
				.findAll({
					include: [
						{
							model: User
						}
					]
				})
				.then(function(result) {
					res.json({status: true, message: 'Get all seminar success', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Get all seminar failed!", err_code: 400, err: err});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	// this.getById = function(req, res) {
	// 	var auth = jwt.validateToken(req.headers, res);
	// 	var id = req.body.id;

	// 	if (auth == false) {
	// 		res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
	// 	} else if (auth.role == 'admin') {
	// 		Seminar
	// 			.findOne({
	// 				where: {
	// 					id: id
	// 				}
	// 			})
	// 			.then(function(result) {
	// 				res.json({status: true, message: 'Get all news success', data: result});
	// 			})
	// 			.catch(function(err) {
	// 				res.json({status: false, message: "Get all news failed!", err_code: 400, err: err});
	// 			});
	// 	} else {
	// 		res.json({status: false, message: "Access Denied", err_code: 403});
	// 	}
	// }

	this.get = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.params.id; //id user

		if (auth == false || auth.id != id) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.findOne({
					where: { pendaftar_seminar: auth.id }
				})
				.then(function(result) {
					// console.log('Get all news successful!');
					if(result == null) {
						res.json({status: false, message: 'No seminar registrant with this ID'});
					} else {
						res.json({status: true, message: 'User has been registered'});
					}
				})
				.catch(function(err) {
					// console.log('Failed to get all news!');
					res.json({status: false, message: "Not yet registered", err_code: 400});
				});
		}
	}

	this.register = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var pendaftar_seminar = auth.id;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.create({pendaftar_seminar: pendaftar_seminar, status_seminar: true})
				.then(function() {
					res.json({status: true, message: 'Register seminar success!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Register seminar failed!', err_code: 400, err: err});
				});
		}
	}

	this.delete = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var pendaftar_seminar = auth.id;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.destroy({
					where: {
						id: pendaftar_seminar
					}
				})
				.then(function() {
					res.json({status: true, message: 'Delete seminar success!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Delete seminar failed!', err_code: 400, err: err});
				});
		}
	}

	this.attend = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var pendaftar_seminar = auth.id;
		var status = req.body.status;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.update({
					hadir_seminar: status
				}, {
					where: {
						id: pendaftar_seminar
					}
				})
				.then(function() {
					res.json({status: true, message: 'Confirmation success!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Confirmation failed!', err_code: 400, err: err});
				});
		}
	}
}

module.exports = new SeminarControllers();
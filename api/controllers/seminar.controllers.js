var express = require('express');

var crypto = require('crypto');
var sequelize = require('../connection');
var jwt = require('../token');

var Seminar = sequelize.import(__dirname + "/../models/seminar.models");
var User = sequelize.import(__dirname + "/../models/user.models");

function SeminarControllers() {
	this.getAll = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			Seminar
				.findAll({order: [['createdAt', 'DESC']]})
				.then(function(result) {
					res.json({status: true, message: 'Get all news success', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Get all news failed!", err_code: 400, err: err});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.getById = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else if (auth.role == 'admin') {
			Seminar
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Get all news success', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Get all news failed!", err_code: 400, err: err});
				});
		} else {
			res.json({status: false, message: "Access Denied", err_code: 403});
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

	this.register = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);
		var pendaftar_seminar = auth.id;

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.destroy({
					where: {
						id: id
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

		if (auth == false) {
			res.json({status: false, message: 'Authentication failed, please login again!', err_code: 401});
		} else {
			Seminar
				.update({
					hadir_seminar: true
				}, {
					where: {
						id: id
					}
				})
				.then(function() {
					res.json({status: true, message: 'Attend seminar success!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Attend seminar failed!', err_code: 400, err: err});
				});
		}
	}
}

module.exports = new SeminarControllers();
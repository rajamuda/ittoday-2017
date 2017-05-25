var express = require('express');

var sequelize = require('../connection');
var jwt = require('../token');

var News = sequelize.import(__dirname + "/../models/news.models");

function NewsControllers() {
	this.getAll = function(req, res) {
		News
			.findAll({order: [['createdAt', 'DESC']]})
			.then(function(result) {
				// console.log('Get all news successful!');
				res.json({status: true, message: 'Get all news success', data: result});
			})
			.catch(function(err) {
				// console.log('Failed to get all news!');
				res.json({status: false, message: "Get all news failed!", err_code: 400, err: err});
			});
	}

	this.getOne = function(id, res) {
		console.log(id);
		News
			.findById(id)
			.then(function(result) {
				// console.log('Get all news successful!');
				if(result == null)
					res.json({status: false, message: 'No news with this ID'});
				else
					res.json({status: true, message: 'Get all news success', data: result});
			})
			.catch(function(err) {
				// console.log('Failed to get all news!');
				res.json({status: false, message: "Get all news failed!", err_code: 400});
			});
	}

	this.create = function(req, res) {
		var auth = jwt.validateToken(req.headers, res);

		var judul_news = req.body.judul_news;
		var isi_news = req.body.isi_news;

		if(auth == false){
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		}else if(auth.role == 'admin'){
			if (!judul_news || !isi_news) {
				res.json({status: false, message: "There is empty field!", err_code: 406});
			} else {
				News
					.create({judul_news: judul_news, isi_news: isi_news})
					.then(function() {
						// console.log('News built successfully!');
						res.json({status: true, message: "Create news success!"})
					})
					.catch(function(err) {
						// console.log(err);
						res.json({status: false, message: "Create news failed!", err_code: 400});
					});
			}
		}else{
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.edit = function(req, res) {
		var auth = jwt.validateToken(req.headers, res); 

		var judul_news = req.body.judul_news;
		var isi_news = req.body.isi_news;
		var id = req.body.id;	

		if(auth == false){
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		}else if(auth.role == 'admin'){
			if (!judul_news || !isi_news) {
				res.json({status: false, message: "There is empty field!", err_code: 406});
			} else {
				News
					.update({
						judul_news: judul_news,
						isi_news: isi_news
					}, {
						where: {
							id: id
						}
					})
					.then(function() {
						// console.log('News update successfully!');
						res.json({status: true, message: "Update news success!"})
					})
					.catch(function(err) {
						// console.log(err);
						res.json({status: false, message: "Update news failed!", err_code: 400});
					});
			}
		}else{
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}

	this.delete = function(req, res){
		var auth = jwt.validateToken(req.headers, res);
		var id = req.body.id;

		// console.log(auth);
		if(auth == false){
			res.json({status: false, message: 'Authentication failed', err_code: 401});
		}else if(auth.role == 'admin'){
			News
				.destroy({
					where: {
						id: id
					}
				})
				.then(function(){
					res.json({status: true, message: 'Delete success'});
				})
				.catch(function(){
					res.json({status: false, message: "Delete news failed!", err_code: 400});
				})

		}else{
			res.json({status: false, message: "Access Denied", err_code: 403});
		}
	}
}

module.exports = new NewsControllers();
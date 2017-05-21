var express = require('express');

var sequelize = require('../connection');

var News = sequelize.import(__dirname + "/../models/news.models");

function NewsControllers() {
	this.getAll = function(res) {
		News
			.findAll({order: ['createdAt', 'DESC']})
			.then(function(result) {
				console.log('Get all news successful!');
				res = JSON.stringify(result);
			})
			.catch(function(err) {
				console.log('Failed to get all news!');
				res.json({status: false, message: "Get all news failed!", err_code: 400});
			});
	}

	this.getOne = function(id, res) {
		News
			.findById(id)
			.then(function(result) {
				console.log('Get all news successful!');
				res = JSON.stringify(result);
			})
			.catch(function(err) {
				console.log('Failed to get all news!');
				res.json({status: false, message: "Get all news failed!", err_code: 400});
			});
	}

	this.create = function(data, res) {
		var judul_news = data.judul_news;
		var isi_news = data.isi_news;

		if (!judul_news || !isi_news) {
			res.json({status: false, message: "There is empty field!", err_code: 406});
		} else {
			News
				.create({judul_news: judul_news, isi_news: isi_news})
				.then(function() {
					console.log('News built successfully!');
					res.json({status: true, message: "Create news success!"})
				})
				.catch(function(err) {
					console.log(err);
					res.json({status: false, message: "Create news failed!", err_code: 400});
				});
		}
	}

	this.edit = function(id, data, res) {
		var judul_news = data.judul_news;
		var isi_news = data.isi_news;

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
					console.log('News update successfully!');
					res.json({status: true, message: "Update news success!"})
				})
				.catch(function(err) {
					console.log(err);
					res.json({status: false, message: "Update news failed!", err_code: 400});
				});
		}
	}
}

module.exports = new NewsControllers();
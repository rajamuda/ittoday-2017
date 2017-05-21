var express = require('express');
var router = express.Router();

var news = require('../controllers/news.controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({status: false, message: 'none API implemented'});
});

/* GET all news. */
router.get('/news', function(req, res, next) {
  news.getAll(res);
});

/* GET all news. */
router.get('/news/:id', function(req, res, next) {
  news.getOne(id, res);
});

/*POST create news */
router.post('/createnews', function(req, res, next){
  news.create(req.body, res);
});

/*POST edit news */
router.post('/editnews', function(req, res, next){
  news.edit(req.body, res);
});

module.exports = router;

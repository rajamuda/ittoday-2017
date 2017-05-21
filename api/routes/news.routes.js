var express = require('express');
var router = express.Router();

var news = require('../controllers/news.controllers');

/* GET all news. */
router.get('/', function(req, res, next) {
  news.getAll(res);
});

/* GET all news. */
router.get('/:id', function(req, res, next) {
  news.getOne(id, res);
});

/*POST create news */
router.post('/create', function(req, res, next){
  news.create(req.body, res);
});

/*POST edit news */
router.post('/edit', function(req, res, next){
  news.edit(req.body, res);
});

module.exports = router;

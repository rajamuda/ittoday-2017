var express = require('express');
var router = express.Router();

var news = require('../controllers/news.controllers');

/* GET all news. */
router.get('/', function(req, res) {
  news.getAll(req, res);
});

/* GET a news. */
router.get('/:id', function(req, res) {
  news.getOne(req.params.id, res);
});

/*POST create news */
router.post('/create', function(req, res){
  news.create(req, res);
});

/*POST edit news */
router.post('/edit', function(req, res){
  news.edit(req, res);
});

/*POST edit news */
router.delete('/delete', function(req, res){
  news.delete(req, res);
});

module.exports = router;

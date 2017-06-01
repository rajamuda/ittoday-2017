var express = require('express');
var router = express.Router();

var appteam = require('../controllers/appteam.controllers');

router.get('/', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.get('/user/:id', function(req, res) {
  appteam.get(req, res);
});

router.get('/all', function(req, res) {
  appteam.getAll(req, res);
});

router.get('/team/:id', function(req, res) {
  appteam.getById(req, res);
});

router.post('/token', function(req, res) {
  appteam.getByToken(req, res);
});

router.post('/create', function(req, res) {
  appteam.create(req, res);
});

router.post('/registermember', function(req, res) {
  appteam.registerMember(req, res);
});

router.post('/submission', function(req, res) {
  appteam.submission(req, res);
});

router.delete('/delete', function(req, res) {
  appteam.delete(req, res);
});

module.exports = router;

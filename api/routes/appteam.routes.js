var express = require('express');
var router = express.Router();

var appteam = require('../controllers/appteam.controllers');

router.post('/', function(req, res) {
  appteam.get(req, res);
});

router.post('/all', function(req, res) {
  appteam.getAll(req, res);
});

router.post('/id', function(req, res) {
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

router.post('/delete', function(req, res) {
  appteam.delete(req, res);
});

module.exports = router;

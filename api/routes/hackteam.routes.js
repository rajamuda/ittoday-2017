var express = require('express');
var router = express.Router();

var hackteam = require('../controllers/hackteam.controllers');

router.get('/', function(req, res) {
  // appteam.get(req, res);
  res.json({status: false, message: 'None API Implemented'});
});

router.get('/user/:id', function(req, res) {
  hackteam.get(req, res);
});

router.get('/all', function(req, res) {
  hackteam.getAll(req, res);
});

router.get('/team/:id', function(req, res) {
  hackteam.getById(req, res);
});

router.post('/token', function(req, res) {
  hackteam.getByToken(req, res);
});

router.post('/create', function(req, res) {
  hackteam.create(req, res);
});

router.post('/registermember', function(req, res) {
  hackteam.registerMember(req, res);
});

router.post('/uploadwriteup', function(req, res) {
  hackteam.uploadWriteUp(req, res);
});

router.post('/disqualify', function(req, res) {
  hackteam.disqualify(req, res);
});

router.post('/qualify', function(req, res) {
  hackteam.qualify(req, res);
});

module.exports = router;

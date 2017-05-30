var express = require('express');
var router = express.Router();

var hackteam = require('../controllers/hackteam.controllers');

router.post('/', function(req, res) {
  hackteam.get(req, res);
});

router.post('/all', function(req, res) {
  hackteam.getAll(req, res);
});

router.post('/id', function(req, res) {
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

router.post('/delete', function(req, res) {
  hackteam.delete(req, res);
});

module.exports = router;

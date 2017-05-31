var express = require('express');
var router = express.Router();

var seminar = require('../controllers/seminar.controllers');

router.get('/', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.get('/:id', function(req, res) {
  seminar.getById(req, res);
});

router.post('/all', function(req, res) {
  seminar.getAll(req, res);
});

router.post('/register', function(req, res) {
  seminar.register(req, res);
});

router.post('/delete', function(req, res) {
  seminar.delete(req, res);
});

router.post('/attend', function(req, res) {
  seminar.attend(req, res);
});

module.exports = router;

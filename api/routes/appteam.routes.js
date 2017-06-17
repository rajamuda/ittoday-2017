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

router.post('/uploadproposal', function(req, res) {
  appteam.uploadProposal(req, res);
});

router.post('/uploadpayment', function(req, res) {
  appteam.uploadPayment(req, res);
})

router.post('/confirmpayment', function(req, res) {
  appteam.confirmPayment(req, res);
})

router.post('/submission', function(req, res) {
  appteam.submission(req, res);
});

router.post('/disqualify', function(req, res) {
  appteam.disqualify(req, res);
});

router.post('/qualify', function(req, res) {
  appteam.qualify(req, res);
});

module.exports = router;

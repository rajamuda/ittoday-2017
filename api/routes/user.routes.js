var express = require('express');
var router = express.Router();

var user = require('../controllers/user.controllers');

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({status: false, message: 'none API implemented'});
});

/* POST user registration. */
router.post('/register', function(req, res) {
  user.register(req.body, res);
});

/*POST user authentication */
router.post('/login', function(req, res){
  user.login(req.body, res);
});

/*POST admin authentication */
router.post('/loginadmin', function(req, res){
  user.loginadmin(req.body, res);
});

/*POST user validation */
router.post('/session', function(req, res){
  user.session(req, res);
});

/*POST user editprofile */
router.post('/editprofile', function(req, res){
  user.editprofile(req.body, req.headers, res);
});

router.get('/showprofile/:id', function(req, res){
	var id = req.params.id;
	var header = req.headers;
	user.showprofile(id, header, res);
});

router.post('/uploadid', function(req, res){
	user.uploadID(req, res);
});

router.post('/resetpass', function(req, res){
  user.resetpass(req, res);
});

router.post('/confirmresetpass', function(req, res){
  user.confirmresetpass(req, res);
});

module.exports = router;

var express = require('express');
var router = express.Router();

var user = require('../controllers/user.controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({status: false, message: 'none API implemented'});
});

/* POST user registration. */
router.post('/register', function(req, res) {
  user.register(req.body, res);
});

/*POST user authentication */
router.post('/login', function(req, res, next){
  user.login(req.body, res);
});

/*POST user validation */
router.post('/session', function(req, res, next){
  user.session(req, res);
});

/*POST user editprofile */
router.post('/editprofile', function(req, res, next){
  user.editprofile(req.body, req.headers, res);
});

router.get('/showprofile/:id', function(req, res, next){
	var id = req.params.id;
	var header = req.headers;
	user.showprofile(id, header, res);
})

module.exports = router;

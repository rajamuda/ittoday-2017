var user = require('./models/user');

module.exports = {
	configure: function(app){
		/* API */
		app.get('/api', function(req, res){
			if(req.header['Authorization']){
				res.send('Hello, world');
			}else{
				res.send('You are cheater!');
			}
		});

		/* user */
		app.post('/api/login', function(req, res){
			user.login(req.body, res);
		});

		app.post('/api/session', function(req, res){
			user.session(req, res);
		});

		/* TODO: admin */

		/* TODO: events */

		/* TODO: registrant */

	}
}


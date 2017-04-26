var user = require('./models/user');

module.exports = {
	configure: function(app){
		/* user */
		app.post('/login', function(req, res){
			user.login(req.body, res);
		});

		app.post('/session', function(req, res){
			user.session(req, res);
		});

		/* TODO: admin */

		/* TODO: events */

		/* TODO: registrant */

	}
}


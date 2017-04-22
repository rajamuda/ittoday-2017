var user = require('./models/user');

module.exports = {
	configure: function(app){
		/* user */
		app.post('/login', function(req, res){
			user.login(req.body, res);
		});

		/* TODO: admin */

		/* TODO: events */

		/* TODO: registrant */

	}
}


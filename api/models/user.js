var conn = require('../connection.js');

function User(){
	this.login = function(data, res){
		let email = data.email;
		let pass = data.pass;
		console.log(data);
		if(email == '' || pass == ''){
			res.json({"status": "1", "message":"there is empty field"});
		}else{
			res.json({"status":"0", "message":"success", "email":email, "bla":"bla"});
		}
	};
}

module.exports = new User();
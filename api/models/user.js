var conn = require('../connection.js');
var crypto = require('crypto');

function User(){
	this.login = function(data, res){
		let email = data.email;
		let pass = crypto.createHash('md5').update(data.pass).digest('hex');

		if(email == '' || pass == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else{
			conn.acquire(function(err, con){
				var query = 'SELECT * FROM ittoday WHERE email = ? and password = ?';
				var query_data = [email, pass]; 
				con.query(query, query_data, function(err, result){
					con.release();
					if(err == null){
						if(!result.length)
							res.json({"status":false, "message":"wrong email or password"});
						else
							res.json({"status":true, "message":"success"});
					}else{
						res.json({"status":false, "message":"error retrieving data"});
					}
				});
			});
		}
	};
}

module.exports = new User();
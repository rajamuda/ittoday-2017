var conn = require('../connection.js');
var crypto = require('crypto');
var modtoken = require('../token.js');

function User(){
	this.session = function(req, res){
		var data = req;
		modtoken.checkToken(data, res);
	}

	this.login = function(data, res){
		let email = data.email;
		let pass = crypto.createHash('md5').update(data.pass).digest('hex');

		if(email == '' || pass == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else{
			conn.acquire(function(err, con){
				var query = 'SELECT * FROM ittoday WHERE email = ? and password = ?';
				var query_data = [email, pass]; 
				console.log(query_data);
				con.query(query, query_data, function(err, result){
					con.release();
					if(err == null){
						if(!result.length){
							res.json({"status":false, "message":"Wrong email or password"});
						}else{
							var signInTime = Math.floor(Date.now()/1000); // iat
							var expired = signInTime + (2*60*60) // exp after 2 hours
							var data = {'id': result[0].id_user, 'nama': result[0].nama_lengkap, 'email': result[0].email, 'iat': signInTime, 'exp': expired};
							var token = modtoken.createToken(data, res);
							res.json({"status":true, "message":"Login success", "token": token});
						}
					}else{
						res.json({"status":false, "message":"Error retrieving data"});
					}
				});
			});
		}
	};
}

module.exports = new User();
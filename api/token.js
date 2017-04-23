var jwt = require('jsonwebtoken');

function Token(){
	this.createToken = function(data, res){
		var token = jwt.sign(data, 'ithariini2017');

		return token
	}

	this.checktoken = function(req, res){
		res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);

    if(req.headers['authorization']){
    	var token = req.headers['authorization'];

    	jwt.verify(token, 'ithariini2017', function(err, decode){
    		if(err){
    			return {status: false, message: 'Token verification failed'};
    		}else{
    			return {status: true, message: 'Verified'};
    		}
    	});
    }else{
    	return {status: false, message: 'No token provided'};
    }

	}
}

module.exports = new Token();
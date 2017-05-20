var jwt = require('jsonwebtoken');

function Token(){
  this.createToken = function(data, res){
    var token = jwt.sign(data, 'ithariini2017');

    return token;
  }

  this.checkToken = function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);

    if(req.headers['authorization']){
      var token = req.headers['authorization'];

      jwt.verify(token, 'ithariini2017', function(err, decode){
        if(err){
          res.json({status: false, message: 'Token verification failed'});
        }else{
          console.log("OK");
          res.json({status: true, message: 'Verified'});
        }
      });
    }else{
      res.json({status: false, message: 'No token provided'});
    }
  }

  this.validateToken = function(header, res){
    var token = header['authorization'];

    try{
      var decoded = jwt.verify(token, 'ithariini2017');
      return decoded;
    }catch(err){
      return false;
    }
  }
}

module.exports = new Token();
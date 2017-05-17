<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    nama_user: DataTypes.STRING,
    email_user: { type: DataTypes.STRING, unique: true, isEmail: true },
    password_user: DataTypes.STRING,
    telepon_user: { type: DataTypes.STRING, isNumeric: true, defaultValue: null },
    kelamin_user: { type: DataTypes.ENUM('L', 'P'), defaultValue: null },
    lahir_user: { type: DataTypes.DATE, defaultValue: null },
    alamat_user: { type: DataTypes.STRING, defaultValue: null },
    tingkat_user: { type: DataTypes.ENUM('S1', 'D3', 'SMA', 'Umum'), defaultValue: null },
    identitas_user: { type: DataTypes.STRING, defaultValue: null },
    institusi_user: { type: DataTypes.STRING, defaultValue: null },
    foto_user: { type: DataTypes.STRING, defaultValue: null },
    status_user: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    getterMethods: {
      getNama: function() {
      	return this.getDataValue('nama_user');
      },
      getEmail: function() {
      	return this.getDataValue('email_user');
      },
      getPassword: function() {
        return this.getDataValue('password_user');
      },
      getTelepon: function() {
        return this.getDataValue('telepon_user');
      },
      getKelamin: function() {
        return this.getDataValue('kelamin_user');
      },
      getLahir: function() {
        return this.getDataValue('lahir_user');
      },
      getAlamat: function() {
        return this.getDataValue('alamat_user');
      },
      getTingkat: function() {
        return this.getDataValue('tingkat_user');
      },
      getIdentitas: function() {
        return this.getDataValue('identitas_user');
      },
      getInstitusi: function() {
        return this.getDataValue('institusi_user');
      },
      getFoto: function() {
        return this.getDataValue('status_user');
      }
    },
    setterMethods: {
      setNama: function(nama) {
        return this.setDataValue('nama_user', nama);
      },
      setEmail: function(email) {
        return this.setDataValue('email_user', email);
      },
      setPassword: function(password) {
        return this.setDataValue('password_user', password);
      },
      setTelepon: function(telepon) {
        return this.setDataValue('telepon_user', telepon);
      },
      setKelamin: function(kelamin) {
        return this.setDataValue('kelamin_user', kelamin);
      },
      setLahir: function(lahir) {
        return this.setDataValue('lahir_user', lahir);
      },
      setAlamat: function(alamat) {
        return this.setDataValue('alamat_user', alamat);
      },
      setTingkat: function(tingkat) {
        return this.setDataValue('tingkat_user', tingkat);
      },
      setIdentitas: function(identitas) {
        return this.setDataValue('identitas_user', identitas);
      },
      setInstitusi: function(institusi) {
        return this.setDataValue('institusi_user', institusi);
      },
      setFoto: function(foto) {
        return this.setDataValue('foto_user', foto);
      },
      setStatus: function(status) {
        return this.setDataValue('status_user', status);
      },
      registerUser: function(nama, email, password) {
        return this.setNama(nama).setEmail(email).setPassword(password);
      }
    }
  });
};
=======
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
>>>>>>> 06bf3b7e7983433833970950b103550e962150d2

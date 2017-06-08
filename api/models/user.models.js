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
    status_user: { type: DataTypes.BOOLEAN, defaultValue: false },
    token_forgetpass_user: { type: DataTypes.STRING, defaultValue: null }
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
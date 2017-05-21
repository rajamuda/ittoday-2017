module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    nama_event: DataTypes.STRING,
    tanggal_event: DataTypes.DATE,
    tingkat_event: DataTypes.ENUM('SMA', 'D3', 'S1', 'Umum'),
    deskripsi_event: DataTypes.STRING,
    biaya_event: DataTypes.INTEGER
  });
};
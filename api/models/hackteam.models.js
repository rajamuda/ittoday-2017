module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hackTeam', {
    nama_team: { type: DataTypes.STRING, unique: true },
    ketua_team: DataTypes.INTEGER,
    anggota1_team: { type: DataTypes.INTEGER, defaultValue: null },
    anggota2_team: { type: DataTypes.INTEGER, defaultValue: null },
    token_team: DataTypes.STRING,
    finalis_team: { type: DataTypes.BOOLEAN, defaultValue: false },
    skor_team: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
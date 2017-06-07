module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hackTeam', {
    nama_team: { type: DataTypes.STRING, unique: true },
    ketua_team: { type: DataTypes.INTEGER, unique: true },
    anggota1_team: { type: DataTypes.INTEGER, defaultValue: null, unique: true },
    anggota2_team: { type: DataTypes.INTEGER, defaultValue: null, unique: true },
    token_team: DataTypes.STRING,
    finalis_team: { type: DataTypes.BOOLEAN, defaultValue: false },
    skor_team: { type: DataTypes.INTEGER, defaultValue: 0 },
    writeup_hack: { type: DataTypes.STRING, defaultValue: null }
  });
};
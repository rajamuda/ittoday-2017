module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appTeam', {
    nama_team: DataTypes.STRING,
    ketua_team: DataTypes.INTEGER,
    anggota1_team: { type: DataTypes.INTEGER, defaultValue: null },
    anggota2_team: { type: DataTypes.INTEGER, defaultValue: null },
    token_team: DataTypes.STRING,
    finalis_team: { type: DataTypes.BOOLEAN, defaultValue: false },
    nama_app: DataTypes.INTEGER,
    kategori_app: DataTypes.STRING,
    deskripsi_app: DataTypes.STRING,
    proposal_app: DataTypes.STRING,
    video_app: DataTypes.STRING,
    link_app: DataTypes.STRING
  });
};
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appTeam', {
    nama_team: { type: DataTypes.STRING, unique: true },
    ketua_team: { type: DataTypes.INTEGER, unique: true },
    anggota1_team: { type: DataTypes.INTEGER, defaultValue: null, unique: true },
    anggota2_team: { type: DataTypes.INTEGER, defaultValue: null, unique: true },
    token_team: DataTypes.STRING,
    finalis_team: { type: DataTypes.BOOLEAN, defaultValue: false },
    semifinalis_team: { type: DataTypes.BOOLEAN, defaultValue: false },
    status_team: { type: DataTypes.BOOLEAN, defaultValue: false},
    nama_app: { type: DataTypes.STRING, defaultValue: null },
    kategori_app: { type: DataTypes.STRING, defaultValue: null },
    deskripsi_app: { type: DataTypes.TEXT, defaultValue: null },
    proposal_app: { type: DataTypes.STRING, defaultValue: null },
    video_app: { type: DataTypes.STRING, defaultValue: null },
    link_app: { type: DataTypes.STRING, defaultValue: null }
  });
};
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seminar', {
    pendaftar_seminar: DataTypes.INTEGER,
    status_seminar: { type: DataTypes.BOOLEAN, defaultValue: false },
    hadir_seminar: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
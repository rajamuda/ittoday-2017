module.exports = function(sequelize, DataTypes) {
  return sequelize.define('news', {
    judul_news: DataTypes.STRING,
    isi_news: DataTypes.TEXT
  }, {
    getterMethods: {
      getJudul: function() {
        return this.getDataValue('judul_news');
      },
      getIsi: function() {
        return this.getDataValue('isi_news');
      }
    },
    setterMethods: {
      setJudul: function(judul) {
        return this.setDataValue('judul_news', judul);
      },
      setIsi: function(judul) {
        return this.setDataValue('isi_news', isi);
      }
    }
  });
};
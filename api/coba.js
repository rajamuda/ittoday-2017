var Sequelize = require('sequelize');
var json = require('json');

var sequelize = new Sequelize('ittodayw_2016', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

/*sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });*/

var Ittoday = sequelize.define('ittoday', {
    nama_lengkap: Sequelize.STRING,
    email: Sequelize.STRING
  },{
    timestamps: false
  });

Ittoday
  .findAll()
  .then(function(result) {
    console.log(JSON.stringify(result))
  })
var Sequelize = require('sequelize');

module.exports = new Sequelize('ittodayw_2017', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
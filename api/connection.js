var Sequelize = require('sequelize');
var json = require('json');

var sequelize = new Sequelize('ittodayw_2017', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sequelize = require('./connection');

/* Sync Database */
var User = sequelize.import(__dirname + "/models/user");
User.sync();
var News = sequelize.import(__dirname + "/models/news");
News.sync();

/* ROUTING */
var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* backend routes handler */
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/register', user);

/* frontend routes handler */
app.use(express.static(path.join(__dirname, 'views')));
app.get('*', function(req, res, next){
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

module.exports = app;

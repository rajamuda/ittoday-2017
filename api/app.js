var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var sequelize = require('./connection');

/* Sync Database */
var User = sequelize.import(__dirname + "/models/user.models");
User.sync();
var News = sequelize.import(__dirname + "/models/news.models");
News.sync();

/* ROUTING */
var index = require('./routes/index');
var user = require('./routes/user.routes');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* backend routes handler */
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/register', user);
app.use('/api/user/login', user);
app.use('/api/user/session', user);
app.use('/api/user/editprofile', user);
app.use('/api/user/showprofile/:id', user);

/* frontend routes handler */
app.use(express.static(path.join(__dirname, 'views')));
app.get('*', function(req, res, next){
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

module.exports = app;

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
var Event = sequelize.import(__dirname + "/models/event.models");
Event.sync();
var HackTeam = sequelize.import(__dirname + "/models/hackteam.models");
HackTeam.sync();
var AppTeam = sequelize.import(__dirname + "/models/appteam.models");
AppTeam.sync();
var Seminar = sequelize.import(__dirname + "/models/seminar.models");
Seminar.sync();

/* ROUTING */
var index = require('./routes/index');
var user = require('./routes/user.routes');
var news = require('./routes/news.routes');
var appteam = require('./routes/appteam.routes');
var hackteam = require('./routes/hackteam.routes');
var seminar = require('./routes/seminar.routes');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* backend routes handler */
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/*', user);
app.use('/api/news', news);
app.use('/api/news/*', news);
app.use('/api/appteam', appteam);
app.use('/api/appteam/*', appteam);
app.use('/api/hackteam', hackteam);
app.use('/api/hackteam/*', hackteam);
app.use('/api/seminar', hackteam);
app.use('/api/seminar/*', hackteam);

/* frontend routes handler */
app.use(express.static(path.join(__dirname, 'views')));
app.get('/admin', function(req, res, next){
  res.sendFile(path.join(__dirname, 'views/admin/index.html'))
});
app.get('*', function(req, res, next){
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

module.exports = app;

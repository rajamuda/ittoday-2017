var express = require('express');
var bodyparser = require('body-parser');
var conn = require('./connection');
var routes = require('./routes');
var cors = require('cors');
var path = require('path');
var app = express();

app.use(cors());

// app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

conn.init();
routes.configure(app);

/* angular frontend */
app.use(express.static(path.join(__dirname, 'views')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var server = app.listen(4200, function(){
        console.log('Server is listening on port ' + server.address().port);
})
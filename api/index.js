var express = require('express');
var bodyparser = require('body-parser');
var conn = require('./connection');
var routes = require('./routes');
var cors = require('cors');

var app = express();

app.use(cors());
// var allowCrossDomain = function(req, res){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.setHeader('Access-Control-Allow-Credentials', true);
// }

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
// app.use(allowCrossDomain);

app.get('/', function(req, res){
	res.send('Hello, world!');
});

conn.init();
routes.configure(app);

var server = app.listen(4200, function(){
	console.log("Server listening on port "+server.address().port);
});
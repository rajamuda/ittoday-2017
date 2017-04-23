var express = require('express');
var path = require("path");

var app = express();

app.use(express.static(__dirname + '/dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.all('/*', function(req, res, next){
	res.render('index.html');
})

var server = app.listen(8080, function(){
	console.log('Server is listening on port ' + server.address().port);
})
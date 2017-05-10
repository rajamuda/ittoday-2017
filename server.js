var express = require('express');
var path = require("path");

var app = express();

// app.use(express.static(__dirname + '/dist'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(8080, function(){
	console.log('Server is listening on port ' + server.address().port);
})
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


/** ERROR HANDLER **/
/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

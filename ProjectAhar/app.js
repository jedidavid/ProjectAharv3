var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
//mongoose setup
var config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',function(){
    console.log('connected to '+ config.database);
});
mongoose.connection.on('error',function(){
    console.log('error to '+ config.database);
});

//mongoose connection

var index = require('./routes/index');
var users = require('./routes/users');
var logs = require('./routes/logs');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'outdir')));//public
//cors
app.use(cors());
//CORS MIDDLEWARE

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', index);
app.use('/users', users);
app.use('/logs',logs);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'outdir/index.html'));
});//para lang sure

// catch 404 and forward to error handler
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
});

module.exports = app;
//ng build na

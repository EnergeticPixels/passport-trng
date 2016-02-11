// set up
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



// configuration
//mongoose.connect(configDB.url);  //connect to our db
var db = require('./config/db');
require('./config/passport')(passport); // pass passport for configuration

// set up our express app
app.use(morgan('dev')); // log ever request to console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({secret: 'ilovescotchschotchyscotchscotch'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages store in sessions

// routes
require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// ERROR HANDLING
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// launch
app.listen(port);
console.log('the magic happens on port ' + port);

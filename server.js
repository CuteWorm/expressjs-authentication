// set up =====================================================

var express 	= require('express');
var app			= express();
var port 		= process.env.PORT || 8080;
var mongoose	= require('mongoose');
var passport 	= require('passport');
var flash		= require('connect-flash');

var morgan 		= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser	= require('body-parser');
var session 	= require('express-session');

var configDB 	= require('./config/database.js');

// configuration =================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

// set up our express application
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // read cookies
app.use(bodyParser());

app.set('view engine', 'ejs');

// required for passport
app.use(session({secret: 'namlearnnodejsauthentication'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// routes =======================================================
require('./app/routes.js')(app, passport)// load our routes and pass in our app and fully configured passport

// launch =======================================================
app.listen(port);
console.log('The magic happens on port ' + port);
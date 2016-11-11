// Dependencies
// -----------------------------------------------------
var path = require('path');
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.createConnection("mongodb://manuasir:Heroku41516-@ds147497.mlab.com:47497/heroku_hbc36tp7");

// Logging and Parsing
app.use(express.static(__dirname + '/../public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/../bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(express.static(__dirname + '/../docs'));
app.use('/docs', function(req,res){res.sendFile(path.resolve('docs/Gruntfile.html'))});

// Routes
// ------------------------------------------------------
require('./routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(process.env.PORT || port);
console.log('App listening on port ' + port);

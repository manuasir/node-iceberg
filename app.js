var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

var app = express();

/**
 * Middleware para eliminar cabecera X-Powered-By: Express
 */
app.disable('x-powered-by');
// var csrfProtection = csrf({ cookie: true });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//lib.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
// app.use('/docs', function(req,res){res.sendFile(path.resolve('docs/Gruntfile.html'))});
app.use('/docs',express.static(path.join(__dirname, 'docs')));

app.use('/', routes);

// error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("ENTRANDO EN 404");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("ENTRANDO EN 404");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log("ERROR EN DEVELOPMENT");
        res.render('layout');
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

module.exports = app;

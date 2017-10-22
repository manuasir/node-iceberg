'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()
/*
 * Middleware para eliminar cabecera X-Powered-By: Express
 */
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use('/docs', function(req,res){res.sendFile(path.resolve('docs/Gruntfile.html'))});
app.use('/docs', express.static(path.join(__dirname, 'docs')))

app.use('/', routes)

// error handler
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('ENTRANDO EN 404')
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('ENTRANDO EN 404')
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    if (err) { console.error('error en desarrollo -> ', err) }
    res.status(err.status || 500).json({error: JSON.stringify(err)})
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
})

module.exports = app

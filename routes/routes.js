
var path = require('path');
var express = require('express');
var router = express.Router();
var Crawler = require('../private/clases/crawler');
var mongoose = require('mongoose');
var util = require('./../private/clases/utils')
var confs = require('../private/clases/configurations')
var _ = require('lodash')
var functions = require('./functions')
// CONECTAR CON MONGODB //
// mongoose.connect('mongodb://manuasir:mongodb@ds147072.mlab.com:47072/heroku_mctx4f0c');
mongoose.connect('mongodb://localhost:27017/crawler');

/**
 * Renderiza la vista principal con cabeceras,footer,etc
 */
router.get('/', function(req, res, next) {
  res.render('layout');
});

/**
 * Ruta que comienza a procesar una cadena
 */
router.get('/crawl/', function(req, res){
  if(!req.query.q || !req.query.level || !req.query.srv)
    return res.status(400).json({code:"faltan parametros de busqueda"});

  var url = util.urlValid(req.query.q);
  var level = (req.query.level < 300) ? req.query.level : 300;
  var srv = req.query.srv;
  var crawl = new Crawler(url,level);

  // cargar configuración predeterminada (ej. blogspot)
  var conf = confs.services(srv)

  crawl.arrancar(crawl.getPrimeraUrl(),crawl.getArbol(),-1,level,conf,function(err,data){
    if(err){
      console.error("terminado con error ",err)
      return res.status(401).json(err);
    }
    crawl.insertTreeIntoDb(function(err,data){
      if(err)
        return res.status(402).json(err);
      var aux = _.join(_.map(functions.getPayloads(data),'payload'))
      res.status(200).json(aux);
    });
  })
});

module.exports = router;
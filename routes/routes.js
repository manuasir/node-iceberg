'use strict';

const express = require('express');
const router = express.Router();
const Crawler = require('../private/lib/crawler');
const mongoose = require('mongoose');
const util = require('../private/lib/utils');
const confs = require('../private/lib/configurations');
const functions = require('./functions');
// CONECTAR CON MONGODB //
//mongoose.connect('mongodb://manuasir:mongodb@ds147072.mlab.com:47072/heroku_mctx4f0c');
mongoose.connect('mongodb://localhost:27017/crawler');

/**
 * Renderiza la vista principal con cabeceras,footer,etc
 */
router.get('/', (req, res, next) => {
  res.render('layout');
});

/**
 * Ruta que comienza a procesar una cadena
 */
router.get('/crawl/', (req, res) => {
  if(!req.query.q || !req.query.level || !req.query.srv)
    return res.status(400).json({code:"faltan parametros de busqueda"});

  let url = util.urlValid(req.query.q);
  let level = (req.query.level < 300) ? req.query.level : 300;
  let srv = req.query.srv;
  let crawl = new Crawler(url,level);
  // cargar configuración predeterminada (ej. blogspot)
  let conf = confs.services(srv);
  console.log("arrancando");
  crawl.arrancar(crawl.getPrimeraUrl(),-1,level,conf,(err,data) => {
    let payloads = [];

    if(err){
      console.error("terminado con error ",err);
      return res.status(401).json(err);
    }
    let wholeTree = crawl.treeToObject();

    functions.getPayloads(wholeTree).map((o)=>{
      payloads.push(o.payload)
    });
    res.status(200).json(payloads);
  })
});



module.exports = router;
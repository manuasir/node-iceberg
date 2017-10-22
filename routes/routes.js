'use strict'

const express = require('express')
const router = express.Router()
const Crawler = require('../lib/classes/crawler')
const util = require('../lib/util/utils')
const confs = require('../lib/util/configurations')
const functions = require('./functions')

/**
 * Ruta que comienza a procesar una cadena
 */
router.get('/crawl/', async (req, res) => {
  try {
    if (!req.query.q || !req.query.level || !req.query.srv) { return res.status(400).json({code: 'faltan parametros de busqueda'}) }

    const url = util.urlValid(req.query.q)
    const level = (req.query.level < 300) ? req.query.level : 300
    const srv = req.query.srv
    const crawl = new Crawler(url, level)
    // cargar configuración predeterminada (ej. blogspot)
    let conf = confs.services(srv)
    console.log('arrancando')
    await crawl.start(0, level, conf)
    const wholeTree = crawl.treeToObject()

    // functions.getPayloads(data).map((o)=>{
    //   if(o.payloads)
    //     payloads.push(o.payload)
    // });
    res.status(200).json(wholeTree)
  } catch (err) {
    console.error('error ', err)
    throw err
  }
})

module.exports = router


var Nodo            = require('../private/models/model.js');
var path = require('path');
var express = require('express');
var router = express.Router();
var Crawler = require('../private/clases/crawler');
var mongoose = require('mongoose');
mongoose.connect('mongodb://manuasir:mongodb@ds147072.mlab.com:47072/heroku_mctx4f0c');
// mongoose.connect('mongodb://localhost:27017/crawler');

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
    var url=""
    if(!req.query.q || !req.query.level)
        return res.status(400).json({code:"faltan parametros de busqueda"});
    var string = req.query.q;
    var level = (req.query.level < 5) ? req.query.level : 5;
    console.log("nivel...",level)
    if(string.indexOf("/") > -1) {
        url = 'http://'+string;
    }
    else
        url = 'http://'+string+"/";

    var arania = new Crawler(url,level);

    arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1,level,function(err,data){
        if(err){
            console.error("terminado con error ",err)
            return res.status(401).json(err);
        }
        console.log("terminado sin error, guardando en mongodb ")
        arania.insertNodeIntoDb(function(err,data){
            if(err)
                return res.status(402).json(err);
            var query = Nodo.find({ datos: url});
            query.exec(function(err, model){
                if(err)
                    return res.status(402).json(err);
                console.log("devuelvo el modelo")
                res.status(200).json(model);
            });
        });
    })
});

module.exports = router;
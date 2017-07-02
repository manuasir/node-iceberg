
var mongoose        = require('mongoose');
var Nodo            = require('../private/models/model.js');
var path = require('path');
var express = require('express');
var router = express.Router();
var Crawler = require('../private/clases/crawler');
var mongoose = require('mongoose');
mongoose.connect('mongodb://manuasir:mongodb@ds147072.mlab.com:47072/heroku_mctx4f0c');
//mongoose.connect('mongodb://localhost/crawler');


/**
 * Funcion que devuelve si un JSON está vacío
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

/**
 * Renderiza la vista principal con cabeceras,footer,etc
 */
router.get('/', function(req, res, next) {
    res.render('layout');
});

/**
 * Ruta que comienza a procesar una cadena
 */
router.get('/model/:cadena', function(req, res){
    var string = req.params.cadena;
    if(string.indexOf("/") > -1) {
        var url = 'http://'+string;
    }
    else
        var url = 'http://'+string+"/";

    var query = Nodo.find({ datos: url});
    query.exec(function(err, model){
        if(err)
            return res.status(400).json(err);

        if(!isEmptyObject(model)){
            console.log("cacheado en bd");
            return res.status(200).json(model);
        }

        var arania = new Crawler(url);

        arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1,2,function(err,data){
            //  console.log("Saliendo del proceso");
            if(err)
                return res.status(401).json(err);
            arania.recorrerArbol(function(err,data){
                // console.log("Terminado de guardar MongoDB");
                if(err)
                    return res.status(402).json(err);
                query.exec(function(err, model){
                    if(err)
                        return res.status(402).json(err);
                    console.log("devuelvo el modelo")
                    res.status(200).json(model);
                });

            });

        })

    });
});


module.exports = router;
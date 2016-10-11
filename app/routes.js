var mongoose        = require('mongoose');
var Nodo            = require('../models/model.js');
var path = require('path');
var arania = require('./crawler');
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db

    app.get('/model/:cadena', function(req, res){
        var cadena = req.body.cadena;
        console.log("buscando: "+req.params.cadena);
        var url = 'http://'+req.params.cadena+"/";
        console.log(url);
        var query = Nodo.find({ datos: url});
        query.exec(function(err, model){
            if(err){
                console.log("error");
                res.send(err);
            }else{
                console.log("encontrados datos,devolviendo");    
                res.json(model);
            }
        });
    });
    // POST Routes
    // --------------------------------------------------------


};
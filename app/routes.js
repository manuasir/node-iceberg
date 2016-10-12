var mongoose        = require('mongoose');
var Nodo            = require('../models/model.js');
var path = require('path');
var Crawler = require('./crawler');


module.exports = function(app) {

    // GET Rutas
    // --------------------------------------------------------
    // Se trae los resultados del MongoDB
    function isEmptyObject(obj) {
      return !Object.keys(obj).length;
    }

    app.get('/model/:cadena', function(req, res){
        var cadena = req.body.cadena;
        
        var url = 'http://'+req.params.cadena+"/";
        console.log("buscando: "+url);
        console.log(url);
        var query = Nodo.find({ datos: url});
        query.exec(function(err, model){
            if(err){
                req.json(err);      
            }
            else{
                if(!isEmptyObject(model)){
                    console.log("NO VACIO");
                    res.json(model);
                }
                else{
                    console.log("NO HAY DATOS, BUSCANDO...");    

                    var arania = new Crawler(url);

                    function iniciar(callback){
                        arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1,1)
                        .then(function(){
                            console.log("Saliendo del proceso");
                            arania.recorrerArbol(function(){
                                console.log("Terminado de guardar MongoDB");
                                return callback();
                            });
                            
                        })
                    }

                    iniciar(function(){
                        query.exec(function(err, model){
                            if(!err)
                                res.json(model);
                        });
                    });

                    
                }
            }
        });
    });

    // POST Rutas
    // --------------------------------------------------------


};
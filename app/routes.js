var mongoose        = require('mongoose');
var Nodo            = require('../models/model.js');
var path = require('path');
var arania = require('./crawler');


// Opens App Routes
module.exports = function(app) {


    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db

    app.get('/model/:cadena', function(req, res){
       // console.log("requiriendo model");
        // Uses Mongoose schema to run the search (empty conditions)
        var cadena = req.body.cadena;
        console.log("buscando: "+req.params.cadena);
        var url = 'http://'+req.params.cadena+"/";
        console.log(url);
        var query = Nodo.find({ datos: url});
        query.exec(function(err, model){
            if(err){
                console.log("error");
                res.send(err);

                var arania = new Crawler("http://www.w3schools.com/",2);
                function iniciar(callback){
                arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1)
                .then(function(){
                    console.log("Saliendo del proceso");

                    arania.recorrerArbol(function(){
                        console.log("Terminado de guardar MongoDB");
                        return callback();
                    });
                    
                })
                }
                

            }else{
                console.log("encontrados datos,devolviendo");
            // If no errors are found, it responds with a JSON of all users    
            res.json(model);
        }
    });
    });
    

    // app.get('*', function(req, res) {
    //         res.sendFile(path.join(__dirname +'/../public/index.html')); // load our public/index.html file
    //     });
    // POST Routes
    // --------------------------------------------------------
   // Provides method for saving new users in the db


};
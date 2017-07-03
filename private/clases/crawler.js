var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = require("request");
var fs = require("fs");
var vueltas = 0;
var url_array = [];
var async = require('async');
var startwith = require('string.prototype.startswith');
var Arbol = require('./tree');
var url_array_global = [];
var util = require('util');
var jsonfile = require('jsonfile');
var treeWrapper = require('json-tree-wrap');
var _ = require('lodash')
/**
 * Clase Crawler:
 * Construye un árbol a partir de una URL,explorando iterativamente entre sus hijos y guardando en MongoDB
 * @param url
 * @constructor
 */
function Crawler(url) {
    // always initialize all instance properties

    this.arbol = new Arbol(url);
    this.cola = [];
    this.url_raiz= url;
    //console.log("NUEVA ARAÑA CON URL Y NIVEL "+url+" "+this.topeNivel);
    // this.db=Crawler.prototype.conectarMongo();
}

/**
 * Conecta con MongoDB
 */
Crawler.prototype.conectarMongo=function(cb){
    mongoTree.connect("mongodb://manuasir:mongodb@ds147497.mlab.com:47497/heroku_hbc36tp7",function(err){
        if(err)
            return err;
        cb()
    });
};

/**
 * Cierra la conexión con MongoDB
 */
Crawler.prototype.cerrarMongo=function(){

    MongoClient.disconnect();
};

/**
 * Devuelve el árbol
 * @returns {Arbol}
 */
Crawler.prototype.getArbol = function(){

    return this.arbol;
};

/**
 * Devuelve el nivel tope de profundidad a explorar
 * @returns {*}
 */
Crawler.prototype.getTopeNivel = function(){

    return this.topeNivel;
};

/**
 * Escribe a JSON
 */
Crawler.prototype.escribirJSON = function(){

    var enrrollado = new treeWrapper();
    var rootWrapper = enrrollado.wrap(this.arbol);
    jsonfile.writeFileSync('elarbol.json', rootWrapper);

};

/**
 * Devuelve la primera URL, de la raíz
 * @returns {Nodo|Node}
 */
Crawler.prototype.getPrimeraUrl = function(){

    return this.arbol.getRaiz();
};

/**
 * Devuelve la raíz
 * @returns {*}
 */
Crawler.prototype.getUrlRaiz = function(){
    //console.log("Devolviendo URL Raiz: "+this.url_raiz);
    return this.url_raiz;
};

/**
 * Proporciona formato adecuado a la URL
 * @param urlraiz
 * @param links
 */
Crawler.prototype.formatearUrl = function(urlraiz,links){

    //return new Promise(function (resolve, reject) {

    var nodostemp = [];
    var cont = 0;
    _.forEach(links,function(item){
        var uri = $(item).attr('href');
        var url;
        if( uri && uri != '' ){
            var eq = (true, uri.startsWith('h'));
            if(!eq){
                url = urlraiz+uri;
                //console.log("THIS.URL RAIZ ------->"+ url);
            }
            else
                url = uri;
            var temp = Arbol.prototype.crearNodo(url);
            nodostemp.push(temp);
        }

    });
    return nodostemp;
    //});
};

/**
 * Obtiene el DOM de una URL
 * @param url
 */
Crawler.prototype.getDocumentData = function (url,cb) {
    // console.log('Processing url');
    //console.log("realizando request a "+url);
    request(url, function(err, resp, body){
        if(err)
            return cb(null,null)
        cb(null,body)
    });
};

/**
 * Recorrer el árbol
 * @param callback
 */
Crawler.prototype.recorrerArbol = function (callback) {
    this.arbol.recorrerArbol(this.arbol.getRaiz(),function(err,data){
        if(err)
            return callback(err,null)
        callback(null,null);
    })
};

/**
 * Comenzar con el procesamiento
 * @param nodo
 * @param arbol
 * @param nivel
 * @param topenivel
 */
Crawler.prototype.arrancar = function (nodo,arbol,nivel,topenivel,callback) {
    var contador = 0;
    Crawler.prototype.procesarUrls(nodo,arbol,nivel,topenivel,function(err,data){
        if(err)
            return callback(err,null)
        callback(null,null)
    })

    //});
};

/**
 * Iterativamente obtiene información filtrada del DOM y va construyendo el árbol
 * @param nodo
 * @param arbol
 * @param nivel
 * @param topenivel
 */
Crawler.prototype.procesarUrls = function(nodo,arbol,nivel,topenivel,mainCallback){
    //console.log("TOPE NIVEL : "+topenivel);
    //return new Promise(function(resolve,reject){
    nivel += 1;
    if(nivel === topenivel) {
        //console.log("fin por niveles");
        return mainCallback(null,null)
    }

    var url = arbol.getDatosNodo(nodo);
    Crawler.prototype.getDocumentData(url,function(err,data){
        //if(err)
        //    return mainCallback(err,null)
        if(data){
            $ = cheerio.load(data);
            var links = $('a');

            if(_.isEmpty(links))
                return mainCallback(null,null);

            //console.log(links.length);
            var hijos = Crawler.prototype.formatearUrl(arbol.getDatosNodo(nodo),links)
            //console.log("hijos...",hijos)
            arbol.addHijosToNodo(nodo,hijos)

            //console.log("añadido hijos a nodo. recorriendo hijos");
            async.each(hijos,function(item,callback){
                //console.log("siguiente"+ item.getDatos());
                Crawler.prototype.procesarUrls(item,arbol,nivel,topenivel,function(err,data){
                    if(err)
                        return callback(err,null)
                    callback(null,null)
                });
            },function(err){
                if(err)
                    return mainCallback(err,null)
                mainCallback(null,null)
            });

        }else
            mainCallback(null,null)
    })

    //});
};

module.exports = Crawler;

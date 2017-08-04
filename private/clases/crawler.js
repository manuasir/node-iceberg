var request = require("request");
var fs = require("fs");
var async = require('async');
var Arbol = require('./tree');
var util = require('./utils');
var jsonfile = require('jsonfile');
var treeWrapper = require('json-tree-wrap');
var _ = require('lodash')
var Filter = require('./filters')
/**
 * Consdtructor Crawler:
 * Construye un árbol a partir de una URL,explorando iterativamente entre sus hijos y guardando en MongoDB
 * @param url
 * @constructor
 */
function Crawler(url) {
  this.arbol = new Arbol(url);
  this.cola = [];
  this.url_raiz= url;
  this.filter = ""
}

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
  return this.url_raiz;
};

/**
 * Genera array de nodos a partir de array de Objetos DOM
 * @param urlraiz
 * @param links
 * @returns Array
 */
Crawler.prototype.urlsToNodosHijos = function(urlraiz,links){
  var nodostemp = [];
  //console.log("LOS LINKSSS ",links)
  _.forEach(links,function(item){
    //var uri =
    var uri = this.filter.getAttr(item,'href')
    //console.log("UNA URI ",uri)
    var url;
    if( uri && uri != '' ){
      var eq = (true, uri.startsWith('h'));
      if(!eq){
        url = urlraiz+uri;
      }
      else
        url = uri;
      var temp = Arbol.prototype.crearNodo(url);
      nodostemp.push(temp);
    }
  });
  return nodostemp;
};

/**
 * Obtiene el DOM de una URL
 * @param url
 */
Crawler.prototype.getDocumentData = function (url,cb) {
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
Crawler.prototype.insertTreeIntoDb = function (callback) {
  this.arbol.insertNodeIntoDb(this.arbol.getRaiz(),function(err,datos){
    if(err)
      return callback(err,null)
    callback(null,datos);
  })
};

/**
 * Comenzar con el procesamiento
 * @param nodo
 * @param arbol
 * @param nivel
 * @param topenivel
 * @param payload
 * @param callback
 */
Crawler.prototype.arrancar = function (nodo,arbol,nivel,topenivel,payload,callback) {
  //console.log(nodo,arbol,nivel,topenivel,payload)
  Crawler.prototype.procesarUrls(nodo,arbol,nivel,topenivel,payload,function(err,data){
    if(err)
      return callback(err,null)
    callback(null,null)
  })
};

/**
 * Iterativamente obtiene información filtrada del DOM y va construyendo el árbol
 * @param nodo
 * @param arbol
 * @param nivel
 * @param topenivel
 * @param addPayload
 * @param mainCallback
 */
Crawler.prototype.procesarUrls = function(nodo,arbol,nivel,topenivel,conf,mainCallback){
  nivel += 1;
  if(!_.isNumber(topenivel))
    topenivel = parseInt(topenivel)
  if(!_.isNumber(nivel))
    topenivel = parseInt(nivel)
  // salir si nivel actual es = al tope del nivel
  if(nivel === topenivel) {
    return mainCallback(null,null)
  }
  // obtener la URL del nodo a explorar
  var url = arbol.getDatosNodo(nodo);
  // Obtener el DOM de la URL
  Crawler.prototype.getDocumentData(url,function(err,DOM){

    if(DOM){
      this.filter = new Filter(DOM)
      // AQUÍ FILTRAR EL CONTENIDO //
      // Extraer hipervínculos para explorar a partir de la URL (también puede tener condiciones,como clases CSS)
      // Obtener los links SIGUIENTES a explorar,por tanto deben ser objetos DOM de tipo 'a' con el attributo HREF
      var links = this.filter.getUrlsByFilter(conf.nextIteration)
      if(links.length < 1)
        return mainCallback(null,null)
      // Si se quiere payload, se incrusta en cada nodo
      if(typeof conf.payload === 'object') {
        var pay = this.filter.getElementsByFilter(conf.payload)
        arbol.setPayload(nodo,pay)
      }

      // Si no hay links, salir de esta iteración
      if(_.isEmpty(links))
        return mainCallback(null,null);

      // devuelve array de Nodos formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
      var hijos = Crawler.prototype.urlsToNodosHijos(arbol.getDatosNodo(nodo),links)
      arbol.addHijosToNodo(nodo,hijos)
      async.each(hijos,function(urlHija,callback){
        Crawler.prototype.procesarUrls(urlHija,arbol,nivel,topenivel,conf,function(err,data){
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
};

module.exports = Crawler;

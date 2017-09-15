const request = require("request");
const async = require('async');
const Arbol = require('./tree');
const _ = require('lodash');
const Filter = require('./filters');

/**
 * Consdtructor Crawler:
 * Construye un árbol a partir de una URL,explorando iterativamente entre sus hijos y guardando en MongoDB
 * @param url
 * @constructor
 */
class Crawler {

  constructor(url) {
    this.arbol = new Arbol(url);
    this.cola = [];
    this.url_raiz = url;
    this.filter = ""
  }

  /**
   * Devuelve el árbol
   * @returns {Arbol}
   */
  getArbol(){
    return this.arbol;
  }

  /**
   * Devuelve la primera URL, de la raíz
   * @returns {Nodo|Node}
   */
  getPrimeraUrl(){
    return this.arbol.getRaiz();
  }

  /**
   * Devuelve la raíz
   * @returns {*}
   */
  getUrlRaiz(){
    return this.url_raiz;
  }

  /**
   * Genera array de nodos a partir de array de Objetos DOM
   * @param urlraiz
   * @param links
   * @returns Array
   */
  urlsToNodosHijos(urlraiz,links){
    let nodostemp = [];
    //console.log("LOS LINKSSS ",links)
    _.forEach(links,function(item){
      //let uri =
      let uri = this.filter.getAttr(item,'href')
      //console.log("UNA URI ",uri)
      let url;
      if( uri && uri !== '' ){
        let eq = (true , uri.startsWith('h'));
        if(!eq){
          url = urlraiz+uri;
        }
        else
          url = uri;
        let temp = Arbol.prototype.crearNodo(url);
        nodostemp.push(temp);
      }
    });
    return nodostemp;
  }

  /**
   * Obtiene el DOM de una URL
   * @param url
   */
  getDocumentData(url,cb) {
    request(url, function(err, resp, body){
      if(err)
        return cb(null,null)
      cb(null,body)
    });
  }

  /**
   * Recorrer el árbol
   * @param callback
   */
  insertTreeIntoDb(callback) {
    this.arbol.insertNodeIntoDb(this.arbol.getRaiz(),function(err,datos){
      if(err)
        return callback(err,null)
      callback(null,datos);
    })
  }

  /**
   * Comenzar con el procesamiento
   * @param nodo
   * @param arbol
   * @param nivel
   * @param topenivel
   * @param payload
   * @param callback
   */
  arrancar(nodo,arbol,nivel,topenivel,payload,callback) {
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
   * @param conf
   * @param mainCallback
   */
  procesarUrls(nodo,arbol,nivel,topenivel,conf,mainCallback){
    console.log("una iteracion")
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
    let url = arbol.getDatosNodo(nodo);
    // Obtener el DOM de la URL
    getDocumentData(url,function(err,DOM){
      console.log("una itera")
      if(DOM){
        this.filter = new Filter(DOM)
        // AQUÍ FILTRAR EL CONTENIDO //
        // Extraer hipervínculos para explorar a partir de la URL (también puede tener condiciones,como lib CSS)
        // Obtener los links SIGUIENTES a explorar,por tanto deben ser objetos DOM de tipo 'a' con el attributo HREF
        let links = this.filter.getUrlsByFilter(conf.nextIteration)
        if(links.length < 1)
          return mainCallback(null,null)
        // Si se quiere payload, se incrusta en cada nodo
        if(typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          arbol.setPayload(nodo,pay)
        }

        // Si no hay links, salir de esta iteración
        if(_.isEmpty(links))
          return mainCallback(null,null);

        // devuelve array de Nodos formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
        let hijos = Crawler.prototype.urlsToNodosHijos(arbol.getDatosNodo(nodo),links)
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
  }

}
module.exports = Crawler;

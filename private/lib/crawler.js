'use strict';

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
    this.url_raiz = url;
    this.filter = "";
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
    _.forEach(links,(item) => {
      //let uri =
      let uri = this.filter.getAttr(item,'href')
      let url;
      if( uri && uri !== '' ){
        let eq = uri.startsWith('h');
        if(!eq){
          url = urlraiz+uri;
        }
        else
          url = uri;
        let temp = this.arbol.crearNodo(url);
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
   * Comenzar con el procesamiento
   * @param nodo
   * @param nivel
   * @param topenivel
   * @param payload
   * @param callback
   */
  arrancar(nodo,nivel,topenivel,payload,callback) {
    this.procesarUrls(nodo,nivel,topenivel,payload,(err) => {
      if(err)
        return callback(err,null)
      callback(null,null)
    })
  };

  /**
   * Convertir el arbol a objeto
   */
  treeToObject() {
    return {
      url: this.arbol.getRaiz().getDatos(),
      payload: this.arbol.getRaiz().getPayload(),
      nextUrls: this.arbol.getRaiz().getAllHijos()
    };
  }


  /**
   * Iterativamente obtiene información filtrada del DOM y va construyendo el árbol
   * @param nodo
   * @param nivel
   * @param topenivel
   * @param conf
   * @param mainCallback
   */
    async procesarUrls(nodo,nivel,topenivel,conf,mainCallback){
    nivel += 1;
    if(!_.isNumber(topenivel))
      topenivel = parseInt(topenivel);
    if(!_.isNumber(nivel))
      topenivel = parseInt(nivel);
    // salir si nivel actual es = al tope del nivel
    if(nivel === topenivel) {
      return mainCallback(null,null)
    }
    // obtener la URL del nodo a explorar
    let url = this.arbol.getDatosNodo(nodo);
    // Obtener el DOM de la URL
    this.getDocumentData(url,(err,DOM) => {
      if(DOM){
        this.filter = new Filter(DOM);
        // AQUÍ FILTRAR EL CONTENIDO //
        // Extraer hipervínculos para explorar a partir de la URL (también puede tener condiciones,como lib CSS)
        // Obtener los links SIGUIENTES a explorar,por tanto deben ser objetos DOM de tipo 'a' con el attributo HREF
        let links = this.filter.getUrlsByFilter(conf.nextIteration);
        if(links.length < 1)
          return mainCallback(null,null);
        // Si se quiere payload, se incrusta en cada nodo
        if(typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload);
          this.arbol.setPayload(nodo,pay)
        }

        // Si no hay links, salir de esta iteración
        if(!links || links.length < 1)
          return mainCallback(null,null);

        // devuelve array de Nodos formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
        let hijos = this.urlsToNodosHijos(this.arbol.getDatosNodo(nodo),links);
        this.arbol.addHijosToNodo(nodo,hijos);
        async.each(hijos,(urlHija,callback) => {
          this.procesarUrls(urlHija,nivel,topenivel,conf,(err,data) => {
            if(err)
              return callback(err,null)
            callback(null,null)
          });
        },(err) => {
          if(err)
            return mainCallback(err,null)
          mainCallback(null,this.treeToObject())
        });

      }else
        mainCallback(null,null)
    })
  }
}

module.exports = Crawler;

'use strict';

const request = require("request");
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
  async getDocumentData(url) {
    return new Promise((resolve, reject) => {
      request(url, function (err, resp, body) {
        if (err)
          reject(null, null);
        resolve(body);
      });
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
  async start(nivel,topenivel,payload,callback) {
    try {
      let nodo = this.arbol.getRaiz();
      console.time("dbsave");
      await this.procesarUrls(nodo, nivel, topenivel, payload)
      console.timeEnd("dbsave");
      return 0;
    }catch(err){
      throw err;
    }
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
   */
  async procesarUrls(nodo,nivel,topenivel,conf){
    try{
      if(!_.isNumber(topenivel))
        topenivel = parseInt(topenivel)
      if(!_.isNumber(nivel))
        topenivel = parseInt(nivel)
      // salir si nivel actual es = al tope del nivel
      if(nivel === topenivel) {
        return 0;
      }
      // obtener la URL del nodo a explorar
      let url = this.arbol.getDatosNodo(nodo);
      // Obtener el DOM de la URL

      let DOM = await this.getDocumentData(url);
      if(DOM){
        this.filter = new Filter(DOM);
        // AQUÍ FILTRAR EL CONTENIDO //
        // Extraer hipervínculos para explorar a partir de la URL (también puede tener condiciones,como lib CSS)
        // Obtener los links SIGUIENTES a explorar,por tanto deben ser objetos DOM de tipo 'a' con el attributo HREF
        let links = this.filter.getUrlsByFilter(conf.nextIteration);
        if(links.length < 1)
          return 0;
        // Si se quiere payload, se incrusta en cada nodo
        if(typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          this.arbol.setPayload(nodo,pay)
        }

        // Si no hay links, salir de esta iteración
        if(!links || links.length < 1)
          return 0;

        // devuelve array de Nodos formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
        let hijos = this.urlsToNodosHijos(this.arbol.getDatosNodo(nodo),links);
        this.arbol.addHijosToNodo(nodo,hijos);

        // == SEQUENTIAL SOLUTION == //

        // performance this
        // for(let  urlHija of hijos){
        //   await this.procesarUrls(urlHija,nivel,topenivel,conf);
        // }

        // == PARALLEL SOLUTION == //
        let promises = [];

        for(let urlHija of hijos){
          promises.push(this.procesarUrls(urlHija,nivel,topenivel,conf));
        }
        await Promise.all(promises);

        return 0;

      }else
        return 0;

    }catch(err){
      throw err;
    }
  }

}
module.exports = Crawler;

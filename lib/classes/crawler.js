'use strict'
const request = require('request')
const Tree = require('./tree')
const _ = require('lodash')
const Filter = require('./filters')

/**
 * Consdtructor Crawler:
 * Construye un árbol a partir de una URL,explorando iterativamente entre sus hijos y guardando en MongoDB
 * @param url
 * @constructor
 */
class Crawler {
  constructor (url) {
    this.tree = new Tree(url)
    this.url_raiz = url
    this.filter = ''
    this.promises = []
  }

  /**
   * Devuelve la raíz
   * @returns {*}
   */
  getUrlRaiz () {
    return this.url_raiz
  }

  /**
   * Genera array de nodos a partir de array de Objetos DOM
   * @param urlraiz
   * @param links
   * @returns Array
   */
  urlsToNodosHijos (urlraiz, links) {
    let nodostemp = []
    _.forEach(links, (item) => {
      // let uri =
      let uri = this.filter.getAttr(item, 'href')
      let url
      if (uri && uri !== '') {
        let eq = uri.startsWith('h')
        if (!eq) {
          url = urlraiz + uri
        } else { url = uri }
        let temp = this.tree.crearNode(url)
        nodostemp.push(temp)
      }
    })
    return nodostemp
  }

  /**
   * Obtiene el DOM de una URL
   * @param url
   */
  async getDocumentData (url) {
    return new Promise((resolve, reject) => {
      request(url, function (err, resp, body) {
        if (err) { reject(err) }
        resolve(body)
      })
    })
  }

  /**
   * Comenzar con el procesamiento
   * @param nivel
   * @param topenivel
   * @param payload
   */
  async start (nivel, topenivel, payload) {
    try {
      console.time('dbsave')
      await this.procesarUrls(this.tree.getRaiz(), nivel, topenivel, payload)
      console.timeEnd('dbsave')
      return 0
    } catch (err) {
      throw err
    }
  }

  /**
   * Convertir el tree a objeto
   */
  treeToObject () {
    return {
      url: this.tree.getRaiz().getData(),
      payload: this.tree.getRaiz().getPayload(),
      nextUrls: this.tree.getRaiz().getAllHijos()
    }
  }

  /**
   * Iterativamente obtiene información filtrada del DOM y va construyendo el árbol
   * @param nodo
   * @param nivel
   * @param topenivel
   * @param conf
   */
  async procesarUrls (nodo, nivel, topenivel, conf) {
    try {
      // console.log("level ",nivel)
      // console.log("topelevel ",topenivel)
      if (!_.isNumber(topenivel)) { topenivel = parseInt(topenivel) }
      if (!_.isNumber(nivel)) { topenivel = parseInt(nivel) }
      // salir si nivel actual es = al tope del nivel
      if (nivel === topenivel) {
        // console.log("saliendo por topenivel ",topenivel)

        return 0
      }
      // obtener la URL del nodo a explorar
      let url = this.tree.getDatosNode(nodo)
      // Obtener el DOM de la URL
      // console.log("obteniendo dom de ",url)
      let DOM = await this.getDocumentData(url)
      // console.log("closed threads ",this.promises.length)

      // console.log("processed thread ")
      if (DOM) {
        // console.log("el DOM de ",url)

        this.filter = new Filter(DOM)
        // AQUÍ FILTRAR EL CONTENIDO //
        // Extraer hipervínculos para explorar a partir de la URL (también puede tener condiciones,como lib CSS)
        // Obtener los links SIGUIENTES a explorar,por tanto deben ser objetos DOM de tipo 'a' con el attributo HREF
        let links = this.filter.getUrlsByFilter(conf.nextIteration)
        if (links.length < 1) { return 0 }
        // Si se quiere payload, se incrusta en cada nodo
        if (typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          this.tree.setPayload(nodo, pay)
        }

        // Si no hay links, salir de esta iteración
        if (!links || links.length < 1) { return 0 }
        // devuelve array de Nodos formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
        let hijos = this.urlsToNodosHijos(this.tree.getDatosNode(nodo), links)
        this.tree.addHijosToNodo(nodo, hijos)
        this.promises = []
        console.log('throwing threads : ', hijos.length)
        for (let urlHija of hijos) {
          console.log('lanzando un hijo para que se procese en nivel', urlHija.url, nivel + 1)
          this.promises.push(this.procesarUrls(urlHija, nivel + 1, topenivel, conf))
        }
        await Promise.all(this.promises)
        console.log('done with ', this.promises.length)
        return 0
      } else { return 0 }
    } catch (err) {
      console.error(' error at crawl time', err)
      throw err
    }
  }
}
module.exports = Crawler

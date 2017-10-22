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
   * Start the process
   * @param level
   * @param toplevel
   * @param payload
   */
  async start (level, toplevel, payload) {
    try {
      console.time('dbsave')
      await this.processUrls(this.tree.getRaiz(), level, toplevel, payload)
      console.timeEnd('dbsave')
      return 0
    } catch (err) {
      throw err
    }
  }

  /**
   * Convert Tree to Object
   */
  treeToObject () {
    return {
      url: this.tree.getRaiz().getData(),
      payload: this.tree.getRaiz().getPayload(),
      nextUrls: this.tree.getRaiz().getAllHijos()
    }
  }

  /**
   * Get filtered DOM information from URLs recursively
   * @param node
   * @param level
   * @param toplevel
   * @param conf
   */
  async processUrls (node, level, toplevel, conf) {
    try {
      if (!_.isNumber(toplevel)) { toplevel = parseInt(toplevel) }
      if (!_.isNumber(level)) { toplevel = parseInt(level) }
      if (level === toplevel) {
        return 0
      }
      // obtener la URL del nodo a explorar
      let url = this.tree.getDatosNode(node)
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
        // Si se quiere payload, se incrusta en cada node
        if (typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          this.tree.setPayload(node, pay)
        }

        // Si no hay links, salir de esta iteración
        if (!links || links.length < 1) { return 0 }
        // devuelve array de nodes formateado con las URL pendientes de explorar obtenidas a partir de los objetos DOM (links)
        let hijos = this.urlsToNodosHijos(this.tree.getDatosNode(node), links)
        this.tree.addHijosToNodo(node, hijos)
        this.promises = []
        console.log('throwing threads : ', hijos.length)
        for (let urlHija of hijos) {
          console.log('lanzando un hijo para que se procese en level', urlHija.url, level + 1)
          this.promises.push(this.processUrls(urlHija, level + 1, toplevel, conf))
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

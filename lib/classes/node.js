'use strict'

/**
 * Class Node: Data structure that stores information about a URL, its content (payload) and its child URLs
 * @param data
 * @constructor
 */
class Node {
  constructor (data) {
    this.url = data
    this.payload = {}
    this.nextUrls = []
  }

  /**
   * Añade hijos a un nodo
   * @param vectorDeNodos
   */
  addHijos (vectorDeNodos) {
    if (vectorDeNodos.length > 0) {
      for (let i = 0; i < vectorDeNodos.length; i++) {
        this.nextUrls.push(vectorDeNodos[i])
      }
    } else {
      this.nextUrls.push(vectorDeNodos)
    }
  }

  /**
   * Obtiene el payload de un nodo
   */
  getPayload () {
    return this.payload
  }

  /**
   * Añade el payload de un nodo
   * @param something
   */
  setPayload (something) {
    let json
    if (something === null || typeof something !== 'object') {
      json = {
        content: JSON.stringify(something)
      }
    } else {
      json = something
    }
    this.payload = json
  }

  /**
   * Obtiene todos los hijos de un nodo
   * @returns {Array}
   */
  getAllHijos () {
    if (this.nextUrls.length > 0) { return this.nextUrls } else { return [] }
  }

  /**
   * Devuelve los data del node
   * @returns {*}
   */
  getData () {
    return this.url
  }
}
module.exports = Node

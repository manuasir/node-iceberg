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
    this.children = []
  }

  /**
   * Add children to a node
   * @param vectorNodes
   */
  addChildren (vectorNodes) {
    if (vectorNodes.length > 0) {
      for (let i = 0; i < vectorNodes.length; i++) {
        this.children.push(vectorNodes[i])
      }
    } else {
      this.children.push(vectorNodes)
    }
  }

  /**
   * Obtains the payload of a node
   */
  getPayload () {
    return this.payload
  }

  /**
   * Adds the payload of a node
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
   * Obtains all the children of a node
   * @returns {Array}
   */
  getAllChildren () {
    if (this.children.length > 0) { return this.children } else { return [] }
  }

  /**
   * Returns data from the
   * @returns {*}
   */
  getData () {
    return this.url
  }
}
module.exports = Node

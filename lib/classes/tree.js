'use strict'

const Node = require('./node')

/**
 * Clase Tree: Estructura de datos con la información y las relaciones entre los nodos
 * @param datos
 * @constructor
 */
class Tree {
  constructor (datos) {
    this.raiz = new Node(datos)
    this.profundidad = 0
  }

  /**
   * Crear un nuevo Node con información pasada por parámetro
   * @param info
   * @returns {Node}
   */
  crearNode (info) {
    return new Node(info)
  };

  /**
   * Obtiene la raíz del árbol
   * @returns {Node|Node}
   */
  getRaiz () {
    return this.raiz
  };

  /**
   * Obtiene la información de un Node
   * @param node
   */
  getDatosNode (node) {
    return node.getData()
  };

  /**
   * Añade un nuevo hijo o conjunto de hijos a un nodo
   * @param node
   * @param pay
   * @returns
   */
  setPayload (node, pay) {
    node.setPayload(pay)
  };

  /**
   * Añade un nuevo hijo o conjunto de hijos a un nodo
   * @param node
   * @param vec
   * @returns
   */
  addHijosToNodo (node, vec) {
    this.profundidad = this.profundidad + 1
    let nodeArray = []
    if (vec.length > 0) {
      // if its an array of stuff, create new Nodes
      vec.forEach(function (item) {
        if (item instanceof Node === false) {
          let temp = new Node(item)
          nodeArray.push(temp)
        } else {
          nodeArray.push(item)
        }
      })
    } else {
      if (vec instanceof Node === false) {
        let temp = new Node(vec)
        nodeArray.push(temp)
      } else {
        nodeArray.push(vec)
      }
    }
    node.addHijos(nodeArray)
  }
}
module.exports = Tree

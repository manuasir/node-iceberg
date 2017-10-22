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
   * @param node{Node}
   * @param pay{Object}
   * @returns
   */
  setPayload (node, pay) {
    node.setPayload(pay)
  };

  /**
   * Check if a node is already in the tree.
   * @param node {Node}
   * @param nodeToFind {Node}
   * @param isThere {Boolean}
   */
  isNodeInTree (node, nodeToFind, isThere) {
    // if(node.getData() === nodeToFind.getData()){
    //   isThere=true
    //   return 0
    // } else {
    //   if(node.getAllHijos())
    //   this.isNodeInTree()
    // }
    isThere=false

  }

  /**
   * Add children
   * @param node{Node}
   * @param vec{Node | Array}
   * @returns
   */
  addChildrenToNode (node, vec) {
    this.profundidad = this.profundidad + 1
    let nodeArray = []
    if (vec.length > 0) {
      for (let item of vec) {
        let isInTree = false
        this.isNodeInTree(this.getRaiz(),item, isInTree)
        if (!isInTree) { nodeArray.push(item) }
      }
    } else {
      nodeArray.push(vec)
    }
    node.addHijos(nodeArray)
  }
}
module.exports = Tree

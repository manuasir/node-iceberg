'use strict'

const Node = require('./node')

/**
 * Class Tree: Structure of data with the information and relations between the nodes
 * @param data
 * @constructor
 */
class Tree {
  constructor (data) {
    this.root = new Node(data)
    this.depth = 0
  }

  /**
   * Create a new Node with information passed by parameters
   * @param info
   * @returns {Node}
   */
  createNode (info) {
    return new Node(info)
  };

  /**
   * Obtains the root of the tree
   * @returns {Node|Node}
   */
  getRoot () {
    return this.root
  };

  /**
   * Obtains information about a Node
   * @param node
   */
  getNodeData (node) {
    return node.getData()
  };

  /**
   * Adds a new child or set of children to a node
   * @param node
   * @param pay
   * @returns
   */
  setPayload (node, pay) {
    node.setPayload(pay)
  };

  /**
   * Adds a new child or set of children to a node
   * @param node
   * @param sibling
   * @returns
   */
  addChildrenToNode (node, sibling) {
    this.depth = this.depth + 1
    let nodeArray = []
    if (sibling.length > 0) {
      // if its an array of stuff, create new Nodes
      sibling.forEach(function (item) {
        if (item instanceof Node === false) {
          let temp = new Node(item)
          nodeArray.push(temp)
        } else {
          nodeArray.push(item)
        }
      })
    } else {
      if (sibling instanceof Node === false) {
        let temp = new Node(sibling)
        nodeArray.push(temp)
      } else {
        nodeArray.push(sibling)
      }
    }
    node.addChildren(nodeArray)
  }
}
module.exports = Tree

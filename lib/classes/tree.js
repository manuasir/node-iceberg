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
    isThere = false
  }

  /**
   * Adds a new child or set of children to a node
   * @param node{Node}
   * @param sibling{Node | Array}
   * @returns
   */
  addChildrenToNode (node, sibling) {
    this.depth = this.depth + 1
    let nodeArray = []
    if (sibling.length > 0) {
      for (let item of sibling) {
        let isInTree = false
        this.isNodeInTree(this.getRoot(), item, isInTree)
        if (!isInTree) { nodeArray.push(item) }
      }
    } else {
      nodeArray.push(sibling)
    }
    node.addChildren(nodeArray)
  }
}
module.exports = Tree

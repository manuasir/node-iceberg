'use strict'

const Node = require('./node')
const _ = require('lodash')
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
  static createNode (info) {
    return new Node(info)
  }

  /**
   * Obtains the root of the tree
   * @returns {Node|Node}
   */
  getRoot () {
    return this.root
  }

  /**
   * Obtains information about a Node
   * @param node
   */
  static getNodeData (node) {
    return node.getData()
  }

  /**
   * Adds a new child or set of children to a node
   * @param node{Node}
   * @param pay{Object}
   * @returns
   */
  static setPayload (node, pay) {
    node.setPayload(pay)
  }

  /**
   * Check if a node is already in the tree.
   * Explore recursively the whole tree checking if a certain node is already around there
   * @param node {Node}
   * @param nodeToFind {Node}
   */
  isNodeInTree (node, nodeToFind) {
    let isThere = false
    if (node.getData() === nodeToFind.getData()) return true
    else {
      let children = node.getAllChildren()
      console.log("los hijos ",children)
      if (children && _.isArray(children) && !_.isEmpty(children)) {
        for (let child of children) {
          if(child.constructor.name === 'Node') {
            isThere = this.isNodeInTree(child, nodeToFind)
            if (isThere) { break; }
          }
        }
      } else return false
      return isThere;
    }
  }

  /**
   * Adds a new child or set of children to a node IF and ONLY IF the new node is not in the tree already
   * @param node{Node}
   * @param children{Array}
   * @returns Array
   */
  addChildrenToNode (node, children) {
    this.depth++
    let nodeArray = []
    if (_.isArray(children)) {
      // remove duplicate children before the insert
      let sibling = Array.from(new Set(_.uniqBy(children, (o) => { return o.getData() })))
      // check if each children is already in the tree
      for (let item of sibling) {
        let isInTree = this.isNodeInTree(this.getRoot(), item)
        if (isInTree) {
          break
        }
        console.log("not in tree ",item)
        nodeArray.push(item)
      }
      node.addChildren(nodeArray)

    } else {
      console.log("single child ",children)
      let isInTree = this.isNodeInTree(this.getRoot(), children)
      if (!isInTree && children.constructor.name==='Node'){
        node.addChildren(children)

      }
    }

  }
}
module.exports = Tree

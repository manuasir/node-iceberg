'use strict'

const request = require('request')
const Tree = require('./tree')
const _ = require('lodash')
const Filter = require('./filter')
const util = require('../util/utils')

/**
 * Iceberg Constructor:
 * Build a tree from an URL, exploring iteratively among children
 * @param url
 * @constructor
 */
class Iceberg {
  constructor (url) {
    this.root = url
    this.tree = new Tree(url)
    this.filter = ''
    this.promises = []
  }

  /**
   * Generates an array of nodes from an array of DOM objects
   * @param links {Filter}
   * @returns Array
   */
  urlDOMToNodes (links) {
    let tempNodes = []
    _.forEach(links, (item) => {
      let uri = this.filter.getElement(item, 'href')
      let url = util.validUrl(uri, this.root)
      let temp = Tree.createNode(url)
      tempNodes.push(temp)
    })
    return tempNodes
  }

  /**
   * Generate an array of urls from user info
   * Eg. meneame.net/?page=1 , iteratorElement.iterator: '?page=' , iteratorElement.url : 'meneame.net'
   * @param iteratorElement
   */
  static generateLinks (iteratorElement) {
    let links = []
    for (let i = 1; i < iteratorElement.maxPage; i++) {
      links.push(iteratorElement.url + iteratorElement.iterator + i)
    }
    return links
  }
  /**
   * Generates an array of nodes from an array of simple array
   * @param links {Array}
   * @returns Array
   */
  static urlArrayToNodes (links) {
    let tempNodes = []
    let root = this.root
    for (let uri of links) {
      let url = util.validUrl(uri, root)
      let temp = Tree.createNode(url)
      tempNodes.push(temp)
    }
    return tempNodes
  }
  /**
   * Gets the DOM of an URL
   * @param url
   */
  async getDocumentData (url) {
    return new Promise((resolve) => {
      request(url, (err, resp, body) => {
        if (err) { resolve({error: err}) }
        resolve(body)
      })
    })
  }

  /**
   * Start the process
   * @param toplevel{Number}
   * @param configuration{Object}
   */
  start (toplevel, configuration) {
    return new Promise((resolve, reject) => {
      if (arguments.length >= 2 && !configuration.iteratorElement.url) {
        this.processUrlsFromInside(this.tree.getRoot(), 0, toplevel, configuration).then(() => { resolve(this.treeToObject()) }).catch((err) => reject(err))
      } else {
        this.processUrlsFromOutside(this.tree.getRoot(), 0, 2, toplevel).then(() => { resolve(this.treeToObject()) }).catch((err) => reject(err))
      }
    })
  }

  /**
   * Convert Tree to Object
   */
  treeToObject () {
    return {
      url: this.tree.getRoot().getData(),
      payload: this.tree.getRoot().getPayload(),
      children: this.tree.getRoot().getAllChildren()
    }
  }

  /**
   * Get filtered DOM information from URLs recursively. Getting the children from the DOM (buttons,pages,tabs,etc)
   * @param node
   * @param level
   * @param toplevel
   * @param conf
   */
  async processUrlsFromInside (node, level, toplevel, conf) {
    try {
      if (isNaN(toplevel)) { toplevel = parseInt(toplevel) }
      if (isNaN(level)) { toplevel = parseInt(level) }
      if (level === toplevel) {
        return 0
      }
      // get the URL of the node to explore
      let url = util.validUrl(node.getData(), this.tree.getRoot().getData())
      // Get the DOM of the URL
      let DOM = await this.getDocumentData(url)

      if (DOM && !DOM.error) {
        this.filter = new Filter(DOM)
        // FILTER THE CONTENT HERE //
        // Extract hyperlinks to browse from the URL (you can also have conditions, such as CSS lib)
        // Get the NEXT links to explore, so they must be __DOM objects__ of type 'a' with the HREF attribute
        // or URLs with parameters to perform iterations
        let children

        let links = this.filter.getFilteredHrefsWithAttribs(conf.iteratorElement)
        if (links.length < 1) { return 0 }
        // If you want selector, it is embedded in each node
        if (typeof conf.selector === 'object') {
          let pay = this.filter.getElementsByFilter(conf.selector)
          Tree.setPayload(node, pay)
        }
        // If there are no links, exit this iteration
        if (!links || links.length < 1) return 0
        // returns array of nodes formatted with the URLs to be explored obtained from the DOM objects (links)
        children = this.urlDOMToNodes(links)
        this.tree.addChildrenToNode(node, children)

        this.promises = []
        for (let childUrl of children) {
          this.promises.push(this.processUrlsFromInside(childUrl, level + 1, toplevel, conf))
        }
        await Promise.all(this.promises)
        return 0
      } else { return 0 }
    } catch (err) {
      throw err
    }
  }

  /**
   * Get filtered DOM information from URLs recursively. Getting the children url ALREADY known (Eg. http://localhost/page=1 - /page=400)
   * @param node
   * @param level
   * @param toplevel
   * @param conf
   */
  async processUrlsFromOutside (node, level, toplevel, conf) {
    try {
      if (isNaN(toplevel)) { toplevel = parseInt(toplevel) }
      if (isNaN(level)) { toplevel = parseInt(level) }
      if (level === toplevel) {
        return 0
      }
      // get the URL of the node to explore
      let url = node.getData()
      // Get the DOM of the URL
      let DOM = await this.getDocumentData(url)
      if (DOM) {
        this.filter = new Filter(DOM)
        let links = Iceberg.generateLinks(conf.iteratorElement)
        if (links.length < 1) { return 0 }
        // If you want selector, it is embedded in each node
        if (typeof conf.selector === 'object') {
          let pay = this.filter.getElementsByFilter(conf.selector)
          Tree.setPayload(node, pay)
        }
        // If there are no links, exit this iteration
        if (!links || links.length < 1) return 0
        // returns array of nodes formatted with the URLs to be explored obtained from the DOM objects (links)
        let children = Iceberg.urlArrayToNodes(links)
        this.tree.addChildrenToNode(node, children)

        this.promises = []
        do {
          let childAux = children
          for (let childUrl of childAux) {
            this.promises.push(this.processUrlsFromOutside(childUrl, level + 1, toplevel, conf))
          }
          await Promise.all(this.promises)
          children = []
        } while (children.length > 0)
        return 0
      } else { return 0 }
    } catch (err) {
      throw err
    }
  }
}

module.exports = Iceberg

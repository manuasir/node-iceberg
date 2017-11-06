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
      let uri = this.filter.getAttr(item, 'href')
      let url
      url = util.validUrl(uri)
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
    for (let i = 0; i < iteratorElement.maxPage; i++) {
      links.push(iteratorElement.url + iteratorElement.iterator + i)
    }
    return links
  }
  /**
   * Generates an array of nodes from an array of simple array
   * @param links {Array}
   * @returns Array
   */
  urlArrayToNodes (links) {
    let tempNodes = []
    for (let uri of links) {
      let url = util.validUrl(uri)
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
    return new Promise((resolve, reject) => {
      request(url, function (err, resp, body) {
        if (err) { reject(err) }
        resolve(body)
      })
    })
  }

  /**
   * Start the process
   * @param toplevel
   * @param configuration
   */
  async start (toplevel, configuration) {
    try {
      if (!configuration.iteratorElement.url) {
        await this.processUrlsFromInside(this.tree.getRoot(), 0, toplevel, configuration)
      } else {
        await this.processUrlsFromOutside(this.tree.getRoot(), 0, toplevel, configuration)
      }
      return this.treeToObject()
    } catch (err) {
      throw err
    }
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
      if (!_.isNumber(toplevel)) { toplevel = parseInt(toplevel) }
      if (!_.isNumber(level)) { toplevel = parseInt(level) }
      if (level === toplevel) {
        return 0
      }
      // get the URL of the node to explore
      let url = node.getData()
      // Get the DOM of the URL
      let DOM = await this.getDocumentData(url)

      if (DOM) {
        this.filter = new Filter(DOM)
        // FILTER THE CONTENT HERE //
        // Extract hyperlinks to browse from the URL (you can also have conditions, such as CSS lib)
        // Get the NEXT links to explore, so they must be __DOM objects__ of type 'a' with the HREF attribute
        // or URLs with parameters to perform iterations
        let children

        let links = this.filter.getFilteredHrefsWithAttribs(conf.iteratorElement)
        if (links.length < 1) { return 0 }
        // If you want payload, it is embedded in each node
        if (typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
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
      if (!_.isNumber(toplevel)) { toplevel = parseInt(toplevel) }
      if (!_.isNumber(level)) { toplevel = parseInt(level) }
      if (level === toplevel) {
        return 0
      }
      // get the URL of the node to explore
      let url = node.getData()
      // Get the DOM of the URL
      let DOM = await this.getDocumentData(url)

      if (DOM) {
        this.filter = new Filter(DOM)
        let links = this.generateLinks(conf.iteratorElement)
        if (links.length < 1) { return 0 }
        // If you want payload, it is embedded in each node
        if (typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          Tree.setPayload(node, pay)
        }
        // If there are no links, exit this iteration
        if (!links || links.length < 1) return 0
        // returns array of nodes formatted with the URLs to be explored obtained from the DOM objects (links)
        let children = this.urlArrayToNodes(links)
        this.tree.addChildrenToNode(node, children)

        this.promises = []
        do {
          for (let childUrl of children / 2) {
            this.promises.push(this.processUrlsFromInside(childUrl, level + 1, toplevel, conf))
            delete children[childUrl]
          }
          await Promise.all(this.promises)
        } while (children.length > 0)
        return 0
      } else { return 0 }
    } catch (err) {
      throw err
    }
  }
}

module.exports = Iceberg

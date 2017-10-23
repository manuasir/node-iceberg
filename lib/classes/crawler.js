'use strict'

const request = require('request')
const Tree = require('./tree')
const _ = require('lodash')
const Filter = require('./filters')
const util = require('../util/utils')

/**
 * Crawler Constructor:
 * Build a tree from an URL, exploring iteratively among children
 * @param url
 * @constructor
 */
class Crawler {
  constructor (url) {
    this.tree = new Tree(url)
    this.url_root = util.validUrl(url)
    this.filter = ''
    this.promises = []
  }

  /**
   * Returns the root
   * @returns {*}
   */
  getUrlRoot () {
    return this.url_root
  }

  /**
   * Generates an array of nodes from an array of DOM objects
   * @param links
   * @returns Array
   */
  addUrlsToNode (links) {
    let tempNodes = []
    _.forEach(links, (item) => {
      let uri = this.filter.getAttr(item, 'href')
      let url
      url = util.validUrl(uri)
      let temp = this.tree.createNode(url)
      tempNodes.push(temp)
    })
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
   * @param payload
   */
  async start (toplevel, payload) {
    try {
      console.time('dbsave')
      await this.processUrls(this.tree.getRoot(), 0, toplevel, payload)
      console.timeEnd('dbsave')
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
      nextUrls: this.tree.getRoot().getAllChildren()
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
      // get the URL of the node to explore
      let url = this.tree.getNodeData(node)
      // Get the DOM of the URL
      let DOM = await this.getDocumentData(url)
      if (DOM) {
        this.filter = new Filter(DOM)
        // FILTER THE CONTENT HERE //
        // Extract hyperlinks to browse from the URL (you can also have conditions, such as CSS lib)
        // Get the NEXT links to explore, so they must be __DOM objects__ of type 'a' with the HREF attribute
        let links = this.filter.getUrlsByFilter(conf.nextIteration)
        if (links.length < 1) { return 0 }
        // If you want payload, it is embedded in each node
        if (typeof conf.payload === 'object') {
          let pay = this.filter.getElementsByFilter(conf.payload)
          this.tree.setPayload(node, pay)
        }
        // If there are no links, exit this iteration
        if (!links || links.length < 1) { return 0 }
        // returns array of nodes formatted with the URLs to be explored obtained from the DOM objects (links)
        let children = this.addUrlsToNode(links)
        this.tree.addChildrenToNode(node, children)
        this.promises = []
        for (let childUrl of children) {
          this.promises.push(this.processUrls(childUrl, level + 1, toplevel, conf))
        }
        await Promise.all(this.promises)
        return 0
      } else { return 0 }
    } catch (err) {
      throw err
    }
  }
}

module.exports = Crawler

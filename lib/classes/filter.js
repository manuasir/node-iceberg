'use strict'

const cheerio = require('cheerio')
const _ = require('lodash')

/**
 * Class Filter: Encapsulates methods to filter DOM content
 * @param DOM
 * @constructor
 */
class Filter {
  /**
   * Constructor. Create an instance of cheerio to work with
   * @param DOM
   */
  constructor (DOM) {
    this.$ = cheerio.load(DOM)
  }

  /**
   * Returns filtered DOM elements
   * @param json
   * @returns {Array}
   */
  getElementsByFilter (json) {
    let payload
    let attrs
    if (!json) {
      payload = this.$('a')
      attrs = _.map(payload, 'attribs', (o) => {
        if (o.hasOwnProperty('href')) { return o }
      })
      return attrs
    } else if (json.attrib) {
      payload = this.$(json.element)
      attrs = _.map(payload, 'attribs', (o) => {
        if (o.hasOwnProperty(json.attrib)) { return o }
      })
      if (json.values) {
        return _.uniq(_.filter(_.map(attrs, json.attrib), (o) => {
          if (new RegExp(json.values.join('|')).test(o)) { return o }
        }))
      } else {
        return _.uniq(_.filter(_.map(attrs, json.attrib), (o) => {
          return o
        }))
      }
    }
  }

  /**
   * Return <a> elements or <a class="some"> in cheerio DOM format
   * @returns {Object}
   */
  getFilteredHrefsWithAttribs (json) {
    if (!json || !json.cssClass || json === false) {
      return this.$('a')
    } else {
      return this.$('a.' + json.cssClass)
    }
  }

  /**
   * Filter by attribute
   * @param element
   * @param attr
   * @returns {*}
   */
  getElement (element, attr) {
    return this.$(element).attr(attr)
  }
}
module.exports = Filter

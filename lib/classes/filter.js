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
   * @returns {*}
   */
  getElementsByFilter (json) {
    let payload
    let hrefs
    if (!json) {
      payload = this.$('a')
      hrefs = _.map(payload, 'attribs', function (o) {
        if (o.hasOwnProperty('href')) { return o }
      })
      return hrefs
    } else if (json.attrib) {
      payload = this.$(json.element)
      hrefs = _.map(payload, 'attribs', function (o) {
        if (o.hasOwnProperty(json.attrib)) { return o }
      })
      return _.uniq(_.filter(_.map(hrefs, json.attrib), function (o) {
        if (new RegExp(json.substrings.join('|')).test(o)) { return o }
      }))
    }

    // TO-DO: Other filters (attributes, classes, children, etc)
    /*
  else if(json.attrib){
    console.log('WITH ATTR')

    payload =  this.$(json.element)
    hrefs = _.map(payload,'attribs',function(o){
      if(o.hasOwnProperty(json.attrib))
        return o
    })
    return hrefs
  }
  else if(json.cssClass){
    console.log('WITH CLASS')

    this.$(json.element).map(function(){
      console.log(this.child().text())
    })
    // hrefs = _.map(payload,'class',function(o){
    //   if(o.class == json.cssClass)
    //     return o
    // })
    //console.log(payload)
    return hrefs
  }
  */
  }

  /**
   * Return <a> elements or <a class="some">
   * @returns {*}
   */
  getFilteredHrefsWithAttribs (json) {
    if (!json || !json.cssClass || json === false) { return this.$('a') } else { return this.$('a.' + json.cssClass) }
  }

  /**
   * Filter by attribute
   * @param item
   * @param attr
   * @returns {*}
   */
  getAttr (item, attr) {
    return this.$(item).attr(attr)
  }
}
module.exports = Filter

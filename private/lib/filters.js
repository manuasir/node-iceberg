'use strict';

const cheerio = require('cheerio');
const _ = require('lodash');

/**
 * Clase Filter: encapsula métodos para filtrar contenido del DOM
 * @param DOM
 * @constructor
 */
class Filter {
  constructor(DOM) {
    this.$ = cheerio.load(DOM);
  }

  /**
   * Devuelve los links
   * @returns {*}
   */
  getAllLinks() {
    return this.$('a');
  }

  /**
   * Devuelve elementos del DOM filtrados
   * @param json
   * @returns {*}
   */
  getElementsByFilter(json) {
    let payload;
    let hrefs;
    if (!json) {
      payload = this.$('a');
      hrefs = _.map(payload, 'attribs', function (o) {
        if (o.hasOwnProperty('href'))
          return o;
      });
      return hrefs
    }
    else if (json.attrib) {
      payload = this.$(json.element);
      hrefs = _.map(payload, 'attribs', function (o) {
        if (o.hasOwnProperty(json.attrib))
          return o
      });
      return _.uniq(_.filter(_.map(hrefs, json.attrib), function (o) {
        if (new RegExp(json.substrings.join("|")).test(o))
          return o
      }));
    }

    // TO-DO: Otros filtros (atributos,clases,hijos,etc)
    /*
  else if(json.attrib){
    console.log('CON ATTR')

    payload =  this.$(json.element)
    hrefs = _.map(payload,'attribs',function(o){
      if(o.hasOwnProperty(json.attrib))
        return o
    })
    return hrefs
  }
  else if(json.cssClass){
    console.log('CON CLASS')

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
  };

  /**
   * Devuelve los links
   * @returns {*}
   */
  getUrlsByFilter(json) {
    if (!json || !json.cssClass || json === false)
      return this.$('a');
    else
      return this.$('a.' + json.cssClass);
  }

  /**
   * Filtra mediante atributo
   * @param item
   * @param attr
   * @returns {*}
   */
  getAttr(item, attr) {
    return this.$(item).attr(attr);
  }
}
module.exports = Filter;



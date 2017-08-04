var cheerio = require('cheerio')
var _ = require('lodash')

/**
 * Clase Nodo: Estructura de datos que guarda información sobre una URL, su contenido(payload) y sus URL hijas
 * @param DOM
 * @constructor
 */
function Filter(DOM) {
  this.$ = cheerio.load(DOM);
}

/**
 * Devuelve los links
 * @returns {*}
 */
Filter.prototype.getAllLinks = function(){
  return this.$('a');
};

/**
 * Devuelve elementos del DOM filtrados
 * @param json
 * @returns {*}
 */
Filter.prototype.getElementsByFilter = function(json){
  var payload;
  var hrefs;
  if(!json){
    console.log('SIN JSON O SIN CLASE, MANDAR TODOS LOS <A HREF>')
    payload =  this.$('a')
    hrefs = _.map(payload,'attribs',function(o){
      if(o.hasOwnProperty('href'))
        return o
    })
    return hrefs
  }
  else if(json.attrib){
    payload =  this.$(json.element)
    hrefs = _.map(payload,'attribs',function(o){
      if(o.hasOwnProperty(json.attrib))
        return o
    })
    var objs = _.uniq(_.filter(_.map(hrefs,json.attrib),function(o){
      if (new RegExp(json.substrings.join("|")).test(o))
        return o
    }));
    return objs
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
Filter.prototype.getUrlsByFilter = function(json){
  if(!json || !json.cssClass)
    return this.$('a');
  else
    return this.$('a.'+json.cssClass);
};

/**
 * Filtra mediante atributo
 * @param item
 * @param attr
 * @returns {*}
 */
Filter.prototype.getAttr = function(item,attr){
  //console.log("devolviendo atributo")
  return this.$(item).attr(attr);
};

module.exports = Filter;



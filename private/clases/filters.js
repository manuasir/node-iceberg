

var cheerio = require('cheerio')

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
 * Filtra mediante atributo
 * @param attr
 * @returns {*}
 */
Filter.prototype.getAttr = function(item,attr){
  //console.log("devolviendo atributo")
  return this.$(item).attr(attr);
};

module.exports = Filter;



var _ = require('lodash')

/**
 * Clase Nodo: Estructura de datos que guarda información sobre una URL, su contenido(payload) y sus URL hijas
 * @param datos
 * @param payload
 * @constructor
 */
function Node(datos) {
  this.url = datos;
  this.payload = {}
  this.nextUrls = [];
}

/**
 * Añade hijos a un nodo
 * @param vectorDeNodos
 */
Node.prototype.addHijos = function(vectorDeUrls){
  if(vectorDeUrls.length>0){
    for(var i=0;i<vectorDeUrls.length;i++){
      this.nextUrls.push(vectorDeUrls[i]);
    }
  }
  else{
    this.nextUrls.push(vectorDeUrls);
  }
};

/**
 * Añade el payload de un nodo
 * @param something
 */
Node.prototype.getPayload = function(){
  return this.payload
};

/**
 * Añade el payload de un nodo
 * @param something
 */
Node.prototype.setPayload = function(something){
  //console.log("seteando payload en nodo ")
  if(!_.isObject(something)){
    this.payload = {unknownType: something}
  }else
    this.payload = something
};

/**
 * Obtiene todos los hijos de un nodo
 * @returns {Array}
 */
Node.prototype.getAllHijos = function(){
  if(this.nextUrls.length>0)
    return this.nextUrls;
  else
    return []
};

/**
 * Obtiene un hijo del nodo
 * @param i
 * @returns {*}
 */
Node.prototype.getHijo = function(i){
  if(this.nextUrls.length > 0)
    return this.nextUrls[i];
  else
    return 0;
};

/**
 * Obtiene número de hijos
 * @returns {Number}
 */
Node.prototype.getNumHijos = function(){

  return this.nextUrls.length;
};

/**
 * Devuelve el nodo
 * @returns {Node}
 */
Node.prototype.getNodo = function(){
  return this;
};

/**
 * Devuelve los datos del nodo
 * @returns {*}
 */
Node.prototype.getDatos = function(){

  return this.url;
};


module.exports = Node;
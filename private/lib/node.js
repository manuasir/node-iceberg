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
Node.prototype.addHijos = function(vectorDeNodos){
  if(vectorDeNodos.length>0){
    for(var i=0;i<vectorDeNodos.length;i++){
      this.nextUrls.push(vectorDeNodos[i]);
    }
  }
  else{
    this.nextUrls.push(vectorDeNodos);
  }
};

/**
 * Obtiene el payload de un nodo
 */
Node.prototype.getPayload = function(){
  return this.payload
};

/**
 * Añade el payload de un nodo
 * @param something
 */
Node.prototype.setPayload = function(something){
  var json
  if(!_.isObject(something)){

    json = {
      content: JSON.stringify(something)
    }
  }
  else{
    json = something

  }

  this.payload = json
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
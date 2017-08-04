var Nodo = require('./node');
var modeloMongo = require('../models/model.js');
var _ = require('lodash')
/**
 * Clase Arbol: Estructura de datos con la información y las relaciones entre los nodos
 * @param datos
 * @constructor
 */
function Arbol(datos) {
  this.raiz = new Nodo(datos);
  this.profundidad = 0;
}

/**
 * Crear un nuevo nodo con información pasada por parámetro
 * @param info
 * @returns {Node}
 */
Arbol.prototype.crearNodo = function(info) {
  var nodo = new Nodo(info);
  return nodo;
};

/**
 * Obtiene la raíz del árbol
 * @returns {Nodo|Node}
 */
Arbol.prototype.getRaiz = function() {
  return this.raiz;
};

/**
 * Obtiene la cola de hijos de un nodo
 * @param nodo
 * @returns {*}
 */
Arbol.prototype.getColaNodo = function(nodo) {
  return nodo.getCola();
};

/**
 * Obtiene la información de un nodo
 * @param nodo
 */
Arbol.prototype.getDatosNodo = function(nodo) {
  return nodo.getDatos();
};

/**
 * Obtiene el número de hijos del árbol
 * @param nodo
 */
Arbol.prototype.getNumHijos = function(nodo) {
  return nodo.getNumHijos();
};

/**
 * Obtiene el nivel de profundidad del árbol
 * @param nodo
 * @returns {number}
 */
Arbol.prototype.getProfundidad = function(nodo) {
  return this.profundidad;
};

/**
 * Devuelve un nodo a partir de un índice
 * @param nodo
 * @param i
 */
Arbol.prototype.getNodo = function(nodo,i) {
  return nodo.getNodo().getHijo(i);
};

/**
 * Devuelve el árbol
 * @returns {Arbol}
 */
Arbol.prototype.getArbol = function() {
  return this;
};

/**
 * Añade un nuevo hijo o conjunto de hijos a un nodo
 * @param nodo
 * @param vec
 * @returns
 */
Arbol.prototype.setPayload = function(nodo,pay) {
  nodo.setPayload(pay)
};

/**
 * Añade un nuevo hijo o conjunto de hijos a un nodo
 * @param nodo
 * @param vec
 * @returns
 */
Arbol.prototype.addHijosToNodo = function(nodo,vec) {

  this.profundidad=this.profundidad+1;
  var arraynodos = [];
  if(vec.length>0){
    vec.forEach(function(item,index){
      if(item instanceof Nodo === false){
        var temp = new Nodo(item);
        arraynodos.push(temp);
      }
      else{
        arraynodos.push(item);
      }
    });
  }
  else{
    if(vec instanceof Nodo === false){
      var temp = new Nodo(vec);
      arraynodos.push(temp);
    }
    else{
      arraynodos.push(vec);
    }
  }
  nodo.addHijos(arraynodos);
};

/**
 * Inserta en MongoDB
 * @param nuevoModelo
 * @param callback
 */
Arbol.prototype.insertIntoMongo = function(nuevoModelo,callback) {
  nuevoModelo.save(function(err,data) {
    if (err) return callback(err,null);
    callback(null,data);
  });
};

/**
 * Recorrer el árbol
 * @param nodo
 */
Arbol.prototype.insertNodeIntoDb = function(nodo,callback){
  console.log("insertando en mongodb")

  var nuevoModelo = modeloMongo({
    url: nodo.getDatos(),
    payload: nodo.getPayload(),
    nextUrls: nodo.getAllHijos()
  });
  Arbol.prototype.insertIntoMongo(nuevoModelo,function(err,datos){
    if(err){
      console.error(" error al insertar ",err)
      return callback(err)
    }
    console.log(datos)
    callback(null,datos)
  })
};

module.exports = Arbol;
'use strict';

const Nodo = require('./node');
const modeloMongo = require('../models/model.js');

/**
 * Clase Arbol: Estructura de datos con la información y las relaciones entre los nodos
 * @param datos
 * @constructor
 */
class Arbol {
  constructor(datos) {
    this.raiz = new Nodo(datos);
    this.profundidad = 0;
  }

  /**
   * Crear un nuevo nodo con información pasada por parámetro
   * @param info
   * @returns {Node}
   */
  crearNodo(info) {
    return new Nodo(info);
  };

  /**
   * Obtiene la raíz del árbol
   * @returns {Nodo|Node}
   */
  getRaiz () {
    return this.raiz;
  };

  /**
   * Obtiene la cola de hijos de un nodo
   * @param nodo
   * @returns {*}
   */
  getColaNodo(nodo) {
    return nodo.getCola();
  };

  /**
   * Obtiene la información de un nodo
   * @param nodo
   */
  getDatosNodo(nodo) {
    return nodo.getDatos();
  };

  /**
   * Obtiene el número de hijos del árbol
   * @param nodo
   */
  getNumHijos(nodo) {
    return nodo.getNumHijos();
  };

  /**
   * Obtiene el nivel de profundidad del árbol
   * @param nodo
   * @returns {number}
   */
  getProfundidad(nodo) {
    return this.profundidad;
  };

  /**
   * Devuelve un nodo a partir de un índice
   * @param nodo
   * @param i
   */
  getNodo(nodo, i) {
    return nodo.getNodo().getHijo(i);
  };

  /**
   * Devuelve el árbol
   * @returns {Arbol}
   */
  getArbol() {
    return this;
  };

  /**
   * Añade un nuevo hijo o conjunto de hijos a un nodo
   * @param nodo
   * @param pay
   * @returns
   */
  setPayload(nodo, pay) {
    nodo.setPayload(pay)
  };

  /**
   * Añade un nuevo hijo o conjunto de hijos a un nodo
   * @param nodo
   * @param vec
   * @returns
   */
  addHijosToNodo(nodo, vec) {
    this.profundidad = this.profundidad + 1;
    let arraynodos = [];
    if (vec.length > 0) {
      vec.forEach(function (item) {
        if (item instanceof Nodo === false) {
          let temp = new Nodo(item);
          arraynodos.push(temp);
        }
        else {
          arraynodos.push(item);
        }
      });
    }
    else {
      if (vec instanceof Nodo === false) {
        let temp = new Nodo(vec);
        arraynodos.push(temp);
      }
      else {
        arraynodos.push(vec);
      }
    }
    nodo.addHijos(arraynodos);
  };

}
module.exports = Arbol;
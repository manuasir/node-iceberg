'use strict';

/**
 * Clase Nodo: Estructura de datos que guarda información sobre una URL, su contenido(payload) y sus URL hijas
 * @param datos
 * @constructor
 */
class Node {
  constructor(datos) {
    this.url = datos;
    this.payload = {};
    this.nextUrls = [];
  }

  /**
   * Añade hijos a un nodo
   * @param vectorDeNodos
   */
  addHijos(vectorDeNodos){
    if(vectorDeNodos.length>0){
      for(let i=0;i<vectorDeNodos.length;i++){
        this.nextUrls.push(vectorDeNodos[i]);
      }
    }
    else{
      this.nextUrls.push(vectorDeNodos);
    }
  }

  /**
   * Obtiene el payload de un nodo
   */
  getPayload(){
    return this.payload
  }

  /**
   * Añade el payload de un nodo
   * @param something
   */
  setPayload(something){
    let json;
    if(something === null || typeof something !== 'object'){
      json = {
        content: JSON.stringify(something)
      }
    }
    else{
      json = something
    }
    this.payload = json
  }

  /**
   * Obtiene todos los hijos de un nodo
   * @returns {Array}
   */
  getAllHijos(){
    if(this.nextUrls.length>0)
      return this.nextUrls;
    else
      return []
  }

  /**
   * Obtiene un hijo del nodo
   * @param i
   * @returns {*}
   */
  getHijo(i){
    if(this.nextUrls.length > 0)
      return this.nextUrls[i];
    else
      return 0;
  }

  /**
   * Obtiene número de hijos
   * @returns {Number}
   */
  getNumHijos(){
    return this.nextUrls.length;
  }

  /**
   * Devuelve el nodo
   * @returns {Node}
   */
  getNodo(){
    return this;
  }

  /**
   * Devuelve los datos del nodo
   * @returns {*}
   */
  getDatos(){
    return this.url;
  }
}
module.exports = Node;
// Clase Node (Node of the tree)

// Constructor
/**
 * Clase Nodo: Estructura de datos que guarda información sobre una URL y sus hijos
 * @param datos
 * @constructor
 */
function Node(datos) {
    this.datos = datos;
    this.hijos = [];

}

/**
 * Añade hijos a un nodo
 * @param vector
 */
Node.prototype.addHijos = function(vector){

    if(vector.length>0){
        for(var i=0;i<vector.length;i++){
            this.hijos.push(vector[i]);
        }
    }
    else{
        this.hijos.push(vector);
    }
};

/**
 * Obtiene todos los hijos de un nodo
 * @returns {Array}
 */
Node.prototype.getAllHijos = function(){

    return this.hijos;
};

/**
 * Obtiene un hijo del nodo
 * @param i
 * @returns {*}
 */
Node.prototype.getHijo = function(i){
    if(this.hijos.length > 0)
        return this.hijos[i];
    else
        return 0;
};

/**
 * Obtiene número de hijos
 * @returns {Number}
 */
Node.prototype.getNumHijos = function(){

    return this.hijos.length;
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

    return this.datos;
};

/**
 * Proporciona datos al nodo
 * @param datos
 */
Node.prototype.setDatos = function(datos){

    this.datos = datos;
};

module.exports = Node;
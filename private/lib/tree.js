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
    static crearNodo(info) {
        return new Nodo(info);
    };

    /**
     * Obtiene la raíz del árbol
     * @returns {Nodo|Node}
     */
    get getRaiz () {
        return this.raiz;
    };

    /**
     * Obtiene la cola de hijos de un nodo
     * @param nodo
     * @returns {*}
     */
    static getColaNodo(nodo) {
        return nodo.getCola();
    };

    /**
     * Obtiene la información de un nodo
     * @param nodo
     */
    static getDatosNodo(nodo) {
        return nodo.getDatos();
    };

    /**
     * Obtiene el número de hijos del árbol
     * @param nodo
     */
    static getNumHijos(nodo) {
        return nodo.getNumHijos();
    };

    /**
     * Obtiene el nivel de profundidad del árbol
     * @param nodo
     * @returns {number}
     */
    static getProfundidad(nodo) {
        return this.profundidad;
    };

    /**
     * Devuelve un nodo a partir de un índice
     * @param nodo
     * @param i
     */
    static getNodo(nodo, i) {
        return nodo.getNodo().getHijo(i);
    };

    /**
     * Devuelve el árbol
     * @returns {Arbol}
     */
    get getArbol() {
        return this;
    };

    /**
     * Añade un nuevo hijo o conjunto de hijos a un nodo
     * @param nodo
     * @param pay
     * @returns
     */
    static setPayload(nodo, pay) {
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

    /**
     * Inserta en MongoDB
     * @param nuevoModelo
     * @param callback
     */
    insertIntoMongo(nuevoModelo, callback) {
        nuevoModelo.save(function (err, data) {
            if (err) return callback(err, null);
            callback(null, data);
        });
    };

    /**
     * Recorrer el árbol
     * @param nodo
     * @param callback
     */
    insertNodeIntoDb(nodo, callback) {
        const nuevoModelo = modeloMongo({
            url: nodo.getDatos(),
            payload: nodo.getPayload(),
            nextUrls: nodo.getAllHijos()
        });
        Arbol.prototype.insertIntoMongo(nuevoModelo, function (err, datos) {
            if (err) {
                console.error(" error al insertar ", err);
                return callback(err);
            }
            callback(null, datos);
        })
    }
}
module.exports = Arbol;
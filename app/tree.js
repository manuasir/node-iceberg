var Nodo = require('./node');
var modeloMongo = require('../models/model.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crawler');
// Constructor
function Arbol(datos) {
  // always initialize all instance properties
  this.raiz = new Nodo(datos);
  this.profundidad = 0;
  // this.nuevoModelo;
  // this.db = mongoose.connection;
  // this.db = mongoTree.connect('mongodb://127.0.0.1:27017/test');
}

// class methods

Arbol.prototype.crearNodo = function(info) {
	var nuevonodo = new Nodo(info);
	return nuevonodo;
};

Arbol.prototype.getRaiz = function() {
	
	return this.raiz;
};

Arbol.prototype.getColaNodo = function(nodo) {
	
	return nodo.getCola();
};

Arbol.prototype.getDatosNodo = function(nodo) {
	
	return nodo.getDatos();
};

Arbol.prototype.getNumHijos = function(nodo) {
	
	return nodo.getNumHijos();
};

Arbol.prototype.getProfundidad = function(nodo) {
	
	return this.profundidad;
};

Arbol.prototype.getNodo = function(nodo,i) {
	
	return nodo.getNodo().getHijo(i);
};

Arbol.prototype.getArbol = function() {
	
	return this;
};

Arbol.prototype.addHijosToNodo = function(nodo,vec) {

	return new Promise(function (resolve, reject) {
		this.profundidad=this.profundidad+1;
	// console.log("añadiendo "+vec.length+" elementos al nodo seleccionado "+nodo.getDatos());
	// console.log(vec);
	var arraynodos = [];
	if(vec.length>0){
		vec.forEach(function(item,index){
			if(item instanceof Nodo == false){
				// console.log("array de tipo de datos que no es nodo");
				var temp = new Nodo(item);
				arraynodos.push(temp);
			}
			else{
				// console.log("vector de nodo");
				// console.log(item instanceof Nodo);
				arraynodos.push(item);
			}
		});
	}
	else{
		if(vec instanceof Nodo == false){
			// console.log("un solo elemento tipo de datos que no es nodo");
			var temp = new Nodo(vec);
			arraynodos.push(temp);
		}
		else{
			// console.log("un solo nodo");
			arraynodos.push(vec);
		}
	}
	nodo.addHijos(arraynodos);
	// console.log("añadidos "+arraynodos.length+ " hijos al nodo "+nodo.getDatos());
	resolve();
});
};

// var aux = [];
Arbol.prototype.getDatosFromMongo = function(nodo) {
	
	this.nuevoModelo.find({datos:nodo.getDatos()}, function(err, datos) {
		if (err) throw err;

  // object of all the users
 // console.log(datos);
});
};

Arbol.prototype.insertIntoMongo = function(nuevoModelo) {
	return new Promise(function (resolve, reject) {
		//console.log("en mongo...");
		nuevoModelo.save(function(err) {
			if (err) throw err;
			resolve();
		});
	});
};


Arbol.prototype.recorrerArbol = function(nodo){
	return new Promise(function (resolve, reject) {
		//console.log("Entrando en recorrerArbol");
		var temp = nodo.getDatos();

		var nuevoModelo = modeloMongo({
			datos: nodo.getDatos(),
				//padre: nodo.getPadre().getDatos(),
				hijos: nodo.getAllHijos()
			});
		
		//console.log("salvando........");

		Arbol.prototype.insertIntoMongo(nuevoModelo)
		.then(function(){
			resolve();
			
		})
	});
};

module.exports = Arbol;
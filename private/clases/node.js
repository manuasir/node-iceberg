// Clase Node (Node of the tree)

// Constructor

function Node(datos) {
  // always initialize all instance properties
  this.datos = datos;
  this.hijos = [];

}
// class methods


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

Node.prototype.getAllHijos = function(){

	return this.hijos;
};

Node.prototype.getHijo = function(i){
	if(this.hijos.length > 0)
		return this.hijos[i];
	else
		return 0;
};


Node.prototype.getNumHijos = function(){

	return this.hijos.length;
};

Node.prototype.getNodo = function(){

	return this;
};

Node.prototype.getDatos = function(){

	return this.datos;
};

Node.prototype.setDatos = function(datos){

	this.datos = datos;
};

// export the class
module.exports = Node;
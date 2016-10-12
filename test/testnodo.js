var nodo = require('../app/node');

var node = new nodo();

var hermano = new nodo();

var hijo = new nodo(2);
var hijo1 = new nodo(22);
var hijo2 = new nodo(33);
var hijo3 = new nodo(44);

var temparr = [];

node.addHijos(hijo);
node.addHijos(hijo1);
node.addHijos(hijo2);
node.addHijos(hijo3);

for(var i=0;i<10;i++){
	var temp = new nodo(i);
	temparr.push(temp);
}
//console.log(node.numHijos()+" "+node.numHermanos());

//console.log(hijo1.getNodo());

hijo1.addHijos(new nodo("http://facebook.com"));
hijo1.addHijos(new nodo("http://tuenti.com"));

console.log("padre "+node.getNumHijos()+" "+node.getAllHijos());
console.log("hijo1 "+hijo1.getNumHijos()+" "+hijo1.getAllHijos());

hijo1.addHijos(temparr);

console.log("hijo1 "+hijo1.getNumHijos()+" "+hijo1.getAllHijos());

hijo1.getAllHijos().forEach(function(item,index){
	console.log(item.getDatos()+" <- datos");
});



console.log(hijo1 instanceof nodo);
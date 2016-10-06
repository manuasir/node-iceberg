var arbol = require('../app/tree');

var tree = new arbol("http://google.es");

var urls = [];

urls.push("http://facebook.com");
urls.push("http://tuenti.com");
urls.push("http://lastfm.com");
urls.push("http://mongodb.com");
urls.push("http://liveleak.com");

tree.addHijosToNodo(tree.getRaiz(),urls);

// console.log("tamaño de la cola del nodo raiz : " +tree.getRaiz().getDatos() + " -> "+tree.getRaiz().getNumHijos());

// console.log("los hijos del nodo raiz : " +tree.getRaiz().getAllHijos());

// tree.getRaiz().getAllHijos().forEach(function(item,index){
// 	console.log("hijos");
// 	console.log(item.getDatos());
// 	if(item.getNumHijos()>0)
// 		item.getHijos().forEach(function(item,index){
// 			console.log("nietos");
// 			console.log(item.getDatos());
// 		});
// });

var urls1 = [];
var urls2 = [];
urls1.push("http://youtube.com");
urls1.push("http://ono.com");
urls1.push("http://slither.com");
urls2.push("http://socket.com");
urls2.push("http://ugr.com");

var nuevoNodo = tree.crearNodo("666");
//console.log(" NUEVO NODO ");console.log(nuevoNodo);

tree.addHijosToNodo(tree.getNodo(tree.getRaiz(),2),urls1);

tree.addHijosToNodo(nuevoNodo,urls2);
// console.log("el nodo "+tree.getDatosNodo(nuevoNodo)+" tiene "+tree.getNumHijos(nuevoNodo)+ "hijos" );

var nuevo = tree.crearNodo("nuevonodo");
tree.addHijosToNodo(nuevoNodo,nuevo);
tree.addHijosToNodo(tree.getNodo(tree.getRaiz(),3),nuevoNodo);
// console.log("HIJOSRAIZ[3] ");console.log(tree.getNodo(tree.getRaiz(),3));
//console.log(nuevoNodo);

//console.log(tree.getRaiz().getHijo(1));
//console.log(tree.getRaiz());

tree.recorrerArbol(tree.getRaiz(),null,function(item){
	console.log("itemm "+item );
});


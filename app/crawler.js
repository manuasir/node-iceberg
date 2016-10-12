var Promise = require('bluebird');
var cheerio = Promise.promisifyAll(require('cheerio'));
var request = Promise.promisifyAll(require("request"));
var fs = Promise.promisifyAll(require("fs"));
var vueltas = 0;
var topeNivel=0;
var url_array = [];
var Async = Promise.promisifyAll(require('async'));
var startwith = require('string.prototype.startswith');
var Arbol = require('./tree');
var url_array_global = [];
var util = require('util');
var jsonfile = require('jsonfile');
var treeWrapper = require('json-tree-wrap');

function Crawler(url,niv) {
  // always initialize all instance properties
  console.log("NUEVA ARAÑA CON URL Y NIVEL "+url+" "+niv);
  this.arbol = new Arbol(url);
  this.cola = [];
  this.url_raiz=url;
  this.topeNivel=niv;
  console.log("NEW CRAWLER CON URL "+this.url_raiz);
  // this.db=Crawler.prototype.conectarMongo();
}

Crawler.prototype.conectarMongo=function(){
	mongoTree.connect('mongodb://127.0.0.1:27017/test',function(err){
		if(!err)
			console.log("conectado a mongo");
		else
			console.log("ERROR :"+err);
	});
};

Crawler.prototype.cerrarMongo=function(){
	
	MongoClient.disconnect();
};


Crawler.prototype.getArbol = function(){

	return this.arbol;
};

Crawler.prototype.getTopeNivel = function(){

	return this.topeNivel;
};

Crawler.prototype.escribirJSON = function(){
	
	var enrrollado = new treeWrapper();
	var rootWrapper = enrrollado.wrap(this.arbol);
	jsonfile.writeFileSync('elarbol.json', rootWrapper);

};

Crawler.prototype.getPrimeraUrl = function(){

	return this.arbol.getRaiz();
};

Crawler.prototype.formatearUrl = function(links,arbol){

	return new Promise(function (resolve, reject) {
		var nodostemp = [];
		links.each(function(index,item){
			var uri = $(item).attr('href');
			var url;
			if( uri && uri != '' ){
				var eq = (true, uri.startsWith('h'));
				if(!eq){	
					console.log("THIS.URL RAIZ ------->"+this.url_raiz)
					url = this.url_raiz+uri;	
				}
				else
					url = uri;
				var temp = arbol.crearNodo(url);
				nodostemp.push(temp);
			}
		});
		resolve(nodostemp);
	});
};

Crawler.prototype.getDocumentData = function (url) {
    // console.log('Processing url');
    return new Promise(function (resolve, reject) {
	//console.log("realizando request a "+url);
		request(url, function(err, resp, body){
		if(!err){
				//console.log("devolviendo body");
				resolve(body);
			}
			else{
				console.log(err);
				reject(err);
			}
		});
	});
};

Crawler.prototype.recorrerArbol = function (callback) {
	console.log('Crawler Recorrer Arbol');

  //  return new Promise(function (resolve, reject) {

  	this.arbol.recorrerArbol(this.arbol.getRaiz())
  	.then(function(){
  		return callback();
  	})



 //resolve();
 //   });
};

Crawler.prototype.arrancar = function (nodo,arbol,nivel) {

	return new Promise(function (resolve, reject) {
		console.log('arrancando url');
		var contador = 0;
		Crawler.prototype.procesarUrls(nodo,arbol,nivel)
		.then(function(){
    	 //salida(data);
    	 console.log("FIN!!!!!!!!!!!!!!!!!!!!!!");
    	 resolve();
    	})

	});
};

Crawler.prototype.procesarUrls = function(nodo,arbol,nivel){
	console.log("TOPE NIVEL : "+this.topeNivel);
	return new Promise(function(resolve,reject){
		nivel = nivel + 1;	
		if(nivel == 1) {
			console.log("fin por niveles");
			resolve();	
		}
		else{
			var contador = 0;
			console.log("turno de "+arbol.getDatosNodo(nodo));
			console.log("nivel "+nivel+" se va a proceder a realizar la peticion GET");
			var url = arbol.getDatosNodo(nodo);
			Crawler.prototype.getDocumentData(url)
			.then(function(data){
				console.log("recibido body de " + arbol.getDatosNodo(nodo));
				$ = cheerio.load(data);
				var links = $('a');
				if(links.length == 0){
					console.log("fin porque no hay links");
					resolve();
				}
				else{
					console.log(links.length);
					Crawler.prototype.formatearUrl(links,arbol)
					.then(function(hijos){

						arbol.addHijosToNodo(nodo,hijos)
						.then(function(){
							console.log("añadido hijos a nodo. recorriendo hijos");
							Async.forEach(hijos,function(item){
								console.log("siguiente"+ item.getDatos());
								
								Crawler.prototype.procesarUrls(item,arbol,nivel)
								.then(function(){
									contador++;
									if(contador == hijos.length)
										resolve();
								});

							},function(err){
								reject(err);
							});
							
						})	
					})	
				}
			})
		}
	});
};

module.exports = Crawler;
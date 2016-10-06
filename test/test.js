var Crawler = require('../app/crawler');

var arania = new Crawler("http://www.w3schools.com/",2);

function iniciar(callback){
	arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1)
	.then(function(){
		console.log("Saliendo del proceso");

		arania.recorrerArbol(function(){
			console.log("Terminado de guardar MongoDB");
			return callback();
		});
		
	})
}

iniciar(function(){
	process.exit();
});
var Crawler = require('../app/crawler');

var arania = new Crawler("http://www.diariodejerez.es/");

arania.arrancar(arania.getPrimeraUrl(),arania.getArbol(),-1,function(){
	console.log("ACABOSE");
		arania.recorrerArbol();
		// arania.escribirJSON();
		// arania.cerrarMongo();

})
.then(function(){
	console.log("GET DATOS"),
	arania.getDatosFromMongo();
})

var assert = require("assert"),
    arbol = require(__dirname+"/../app/tree.js");

describe('Arbol', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(arbol, "Cargado");
    });

    });
 
});

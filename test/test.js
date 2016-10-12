var assert = require("assert"),
    node = require(__dirname+"/../app/node.js");

describe('Nodo', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(node, "Cargado");
    });

    });
 
});

var assert = require("assert"),
    arbol = require(__dirname+"/../app/tree.js"),
    nodo = require(__dirname+"/../app/node.js"),
    crawler = require(__dirname+"/../app/crawler.js");

describe('Arbol', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(arbol, "Cargado");
    });

    });
 
});


describe('Crawler', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(crawler, "Cargado");
    });

    });
   
});
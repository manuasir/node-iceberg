var assert = require("assert"),
    arbol = require(__dirname+"/../app/tree.js"),
    nodo = require(__dirname+"/../app/node.js"),
    crawler = require(__dirname+"/../app/crawler.js");

describe('Nodo', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(nodo, "Cargado");
    });

    });
    describe('Crea', function(){
    it('should create nodo correctly', function(){
        var nodes = new nodo('Creado');
        assert.equal(nodes.getDatos(),"Creado");
    });
    });
});

describe('Arbol', function(){
    // Testea que se haya cargado bien la librera
    describe('Carga', function(){
    it('should be loaded', function(){
        assert(arbol, "Cargado");
    });

    });
    describe('Crea', function(){
    it('should create arbol correctly', function(){
        var tree = new arbol('Polopos');
        assert.equal(tree.getRaiz().getDatos(), "Polopos");
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
    describe('Crea', function(){
    it('should create crawler correctly', function(){
        var crawl = new crawler('http://prueba.com');
        assert.equal(crawl.getUrlRaiz(), "http://prueba.com");
    });
    });
});
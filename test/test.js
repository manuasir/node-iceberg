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
    it('should create apuestas correctly', function(){
        var node = new nodo('Polopos','Alhama','2-3');
        assert.equal(node.as_string(), "Polopos: Alhama - 2-3","Creado");
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
    it('should create apuestas correctly', function(){
        var tree = new arbol('Polopos');
        assert.equal(nuevo_usuario.as_string(), "Polopos");
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
    it('should create apuestas correctly', function(){
        var crawl = new crawler('http://prueba.com');
        assert.equal(crawl.getUrlRaiz(), "http://prueba.com");
    });
    });
});
const assert = require('assert'),
  arbol = require('../lib/classes/tree.js'),
  nodo = require('../lib/classes/node.js'),
  crawler = require('../lib/classes/crawler.js')

describe('Integration tests', function () {
  describe('Nodo', function () {
    // Testea que se haya cargado bien la librera
    describe('Carga', function () {
      it('should be loaded', function () {
        assert(nodo, 'Cargado')
      })
    })
    describe('Crea', function () {
      it('should create nodo correctly', function () {
        const nodes = new nodo('Creado')
        assert.equal(nodes.getData(), 'Creado')
      })
    })
  })

  describe('Arbol', function () {
    // Testea que se haya cargado bien la librera
    describe('Carga', function () {
      it('should be loaded', function () {
        assert(arbol, 'Cargado')
      })
    })
    describe('Crea', function () {
      it('should create arbol correctly', function () {
        const tree = new arbol('Polopos')
        assert.equal(tree.getRaiz().getData(), 'Polopos')
      })
    })
  })

  describe('Crawler', function () {
    // Testea que se haya cargado bien la librera
    describe('Carga', function () {
      it('should be loaded', function () {
        assert(crawler, 'Cargado')
      })
    })
    describe('Crea', function () {
      it('should create crawler correctly', function () {
        const crawl = new crawler('http://prueba.com')
        assert.equal(crawl.getUrlRaiz(), 'http://prueba.com')
      })
    })
  })
})

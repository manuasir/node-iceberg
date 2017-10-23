/* global describe it */
'use strict'

const assert = require('assert')
const Tree = require('../lib/classes/tree.js')
const Node = require('../lib/classes/node.js')
const Crawler = require('../lib/classes/crawler.js')
const Filter = require('../lib/classes/filters.js')

describe('Integration tests', function () {
  describe('Node', function () {
    describe('Load', function () {
      it('a node should be loaded', function () {
        assert(Node, 'Loaded')
      })
    })
    describe('Create', function () {
      it('should create node correctly', function () {
        const nodes = new Node('Creado')
        assert.equal(nodes.getData(), 'Creado')
      })
    })
  })

  describe('Arbol', function () {
    describe('Load', function () {
      it('should be loaded', function () {
        assert(Tree, 'Loaded')
      })
    })
    describe('Create', function () {
      it('should create arbol correctly', function () {
        const tree = new Tree('Polopos')
        assert.equal(tree.getRoot().getData(), 'Polopos')
      })
    })
  })

  describe('Crawler', function () {
    describe('Load', function () {
      it('crawler should be loaded', function () {
        assert(Crawler, 'Loaded')
      })
    })
    describe('Create', function () {
      it('should create crawler correctly', function () {
        const crawl = new Crawler('http://prueba.com')
        assert.equal(crawl.getUrlRoot(), 'http://prueba.com')
      })
    })
  })
  describe('Filter', function () {
    describe('Load', function () {
      it('filter should be loaded', function () {
        assert(Filter)
      })
    })

  })
})

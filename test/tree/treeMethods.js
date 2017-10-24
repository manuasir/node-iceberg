/* global describe it */
'use strict'

const assert = require('assert')
const Tree = require('../../lib/classes/tree.js')
const Node = require('../../lib/classes/node.js')
const Crawler = require('../../lib/classes/crawler.js')

describe('Module tests', function () {
  describe('Node', function () {
    describe('Load', function () {
      it('a node should be loaded', function () {
        assert(Node)
      })
    })
    describe('Create', function () {
      it('should create node correctly', function () {
        const nodes = new Node('OK')
        assert.equal(nodes.getData(), 'OK')
      })
    })
    describe('Node functions', function () {
      it('should add a child correctly', function () {
        const father = new Node('father')
        const child = new Node('imNew')
        father.addChildren(child)
        assert.equal(father.getAllChildren().length, 1)
      })
      it('should add a child correctly', function () {
        const father = new Node('father')
        const child = new Node('imNew')
        father.addChildren(child)
        assert.equal(father.getAllChildren().length, 1)
      })
    })
  })

  describe('Tree', function () {
    describe('Load', function () {
      it('tree should be loaded', function () {
        assert(Tree)
      })
    })
    describe('Create', function () {
      it('should create tree correctly', function () {
        const tree = new Tree('OK')
        assert.equal(tree.getRoot().getData(), 'OK')
      })
    })
  })

  describe('Crawler', function () {
    describe('Load', function () {
      it('crawler should be loaded', function () {
        assert(Crawler)
      })
    })
    describe('Create', function () {
      it('should create crawler correctly', function () {
        const crawl = new Crawler('http://test.com')
        assert.equal(crawl.getUrlRoot(), 'http://test.com')
      })
    })
  })
})

/* global describe it */
'use strict'

const assert = require('assert')
const Tree = require('../../lib/classes/tree.js')
const chai = require('chai')
const expect = chai.expect

describe('Class tests', function () {
  describe('Tree', function () {
    describe('Load', function () {
      it('tree should be loaded', function () {
        assert(Tree)
      })
    })
    describe('Create', function () {
      it('should create tree correctly', function () {
        assert(new Tree('OK'))
      })
    })
    describe('Tree methods', function () {
      it('Create new Node', function () {
        const tree = new Tree('OK')
        expect(tree.createNode('newURL')).to.be.a('Object')
      })
      it('should get Root data correctly', function () {
        const tree = new Tree('OK')
        assert.equal(tree.getRoot().getData(), 'OK')
      })
      it('should get Root Object', function () {
        const tree = new Tree('OK')
        expect(tree.getRoot()).to.be.a('Object')
      })
      it('should get Root Data', function () {
        const tree = new Tree('OK')
        expect(tree.getNodeData(tree.getRoot())).to.be.a('String')
      })
      it('should add children to any node in the tree', function () {
        const tree = new Tree('OK')
        const firstAmountOfChildren = tree.getRoot().getAllChildren().length
        expect(firstAmountOfChildren).equal(0)

        tree.addChildrenToNode(tree.getRoot(),tree.createNode('newChild'))
        const secAmountOfChildren = tree.getRoot().getAllChildren().length
        expect(secAmountOfChildren).equal(1)
      })
    })
  })
})

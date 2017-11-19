/* global describe it */
'use strict'

const assert = require('assert')
const Tree = require('../../lib/classes/tree.js')
const chai = require('chai')
const expect = chai.expect

describe('Tree method tests', () => {
  describe('Tree', () => {
    describe('Load', () => {
      it('tree should be loaded', () => {
        assert(Tree)
      })
    })
    describe('Create', () => {
      it('should create tree correctly', () => {
        assert(new Tree('OK'))
      })
    })
    describe('Tree methods', () => {
      it('Create new Node', () => {
        expect(Tree.createNode('newURL')).to.be.a('Object')
      })
      it('should get Root data correctly', () => {
        const tree = new Tree('OK')
        assert.equal(tree.getRoot().getData(), 'OK')
      })
      it('should get Root Object', () => {
        const tree = new Tree('OK')
        expect(tree.getRoot()).to.be.a('Object')
      })
      it('should get Root Data', () => {
        const tree = new Tree('OK')
        expect(Tree.getNodeData(tree.getRoot())).to.be.a('String')
      })
      it('should add children to any node in the tree', () => {
        const tree = new Tree('OK')
        const firstAmountOfChildren = tree.getRoot().getAllChildren().length
        expect(firstAmountOfChildren).equal(0)
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('newChild'))
        const secAmountOfChildren = tree.getRoot().getAllChildren().length
        expect(secAmountOfChildren).equal(1)
      })
      it('should not add duplicate entries', () => {
        const tree = new Tree('1')
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('12'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('13'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('14'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('14'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('14'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('14'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('12'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('12'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('13'))
        tree.addChildrenToNode(tree.getRoot(), Tree.createNode('15'))
        const secAmountOfChildren = tree.getRoot().getAllChildren().length
        expect(secAmountOfChildren).equal(4)
      })
    })
  })
})

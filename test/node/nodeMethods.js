/* global describe it */
'use strict'

const assert = require('assert')
const Node = require('../../lib/classes/node.js')
const chai = require('chai')
const expect = chai.expect

describe('Node method tests', function () {
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
    describe('Node methods', function () {
      it('should add a child correctly', function () {
        const father = new Node('father')
        const child = new Node('imNew')
        father.addChildren(child)
        assert.equal(father.getAllChildren().length, 1)
      })
      it('should set payload correctly', function () {
        const father = new Node('father')
        father.setPayload({a: 'href'})
        expect(father.getPayload()).to.be.a('Object')
      })
      it('getAllChildren() should return an empty Array if there are no children', function () {
        const father = new Node('father')
        expect(father.getAllChildren()).to.be.a('Array')
      })
      it('getData() should return an String (URL)', function () {
        const father = new Node('father')
        expect(father.getData()).to.be.a('String')
      })
    })
  })
})

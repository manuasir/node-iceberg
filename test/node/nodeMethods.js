/* global describe it */
'use strict'

const assert = require('assert')
const Node = require('../../lib/classes/node.js')
const chai = require('chai')
const expect = chai.expect

describe('Node method tests', () => {
  describe('Node', () => {
    describe('Load', () => {
      it('a node should be loaded', () => {
        assert(Node)
      })
    })
    describe('Create', () => {
      it('should create node correctly', () => {
        const nodes = new Node('OK')
        assert.equal(nodes.getData(), 'OK')
      })
    })
    describe('Node methods', () => {
      it('should add a child correctly', () => {
        const father = new Node('father')
        const child = new Node('imNew')
        father.addChildren(child)
        assert.equal(father.getAllChildren().length, 1)
      })
      it('should set selector correctly', () => {
        const father = new Node('father')
        father.setPayload({a: 'href'})
        expect(father.getPayload()).to.be.a('Object')
      })
      it('getAllChildren() should return an empty Array if there are no children', () => {
        const father = new Node('father')
        expect(father.getAllChildren()).to.be.a('Array')
      })
      it('getData() should return an String (URL)', () => {
        const father = new Node('father')
        expect(father.getData()).to.be.a('String')
      })
    })
  })
})

/* global describe it */

'use strict'

const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Crawler = require('../../lib/classes/Iceberg')
const confs = require('../../plugins/configurations')
const assert = require('assert')
describe('Scraper feature tests', () => {
  describe('testing scraper', () => {
    it('level 1', async () => {
      try {
        assert(should)
        const url = 'http://estacion-katowice.blogspot.com'
        const level = 4
        let conf = confs.services('blogspot')
        const crawl = new Crawler(url)
        await crawl.start(level, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree).to.be.a('Object')
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(1)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children.should.have.lengthOf(1)
        wholeTree.children[0].children[0].children.should.have.lengthOf(1)
        wholeTree.children[0].payload.should.have.lengthOf(7)
        return 0
      } catch (err) {
        console.error('el err ', err)
        throw err
      }
    })
  })
})

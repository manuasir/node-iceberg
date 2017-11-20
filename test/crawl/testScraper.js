/* global describe it */

'use strict'
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Iceberg = require('../../lib/classes/iceberg')
const confs = require('../../plugins/configurations')
const assert = require('assert')
describe('Scraper feature tests', () => {
  describe('testing scraper', () => {
    /*
    it('Example with website, unknown iteration (getting from inside)', async () => {
      try {
        assert(should)
        const url = 'http://estacion-katowice.blogspot.com'
        const level = 4
        let conf = confs.services('blogspot')
        const scraper = new Iceberg(url)
        await scraper.start(level, conf)
        const wholeTree = scraper.treeToObject()
        expect(wholeTree).to.be.a('Object')
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(1)
        expect(wholeTree.children[0].children).to.be.a('Array')
        console.log(wholeTree.children[0].children)
        wholeTree.children[0].children.should.have.lengthOf(1)
        wholeTree.children[0].children[0].children.should.have.lengthOf(1)
        wholeTree.children[0].selector.should.have.lengthOf(7)
        expect(scraper.getNodeAmount()).equal(5)
        expect(scraper.getDataAmount()).equal(27)
        return 0
      } catch (err) {
        console.error('el err ', err)
        throw err
      }
    })
    */
    it('Example with website, already known iteration (getting from outside)', async () => {
      try {
        assert(should)
        const url = 'http://www.insecam.org/en/byrating/'
        let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 5 }, selector: { element: 'img', attrib: 'src' } }

        const scraper = new Iceberg(url)
        console.log(conf)
        const wholeTree = await scraper.start(conf)
        expect(wholeTree).to.be.a('Object')
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(4)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].selector.should.have.lengthOf(6)
        return 0
      } catch (err) {
        console.error('el err ', err)
        throw err
      }
    })
    it('No need to IIFE, trying to then() and catch() )', (done) => {
      const url = 'http://www.insecam.org/en/byrating/'
      let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 2 }, selector: { element: 'img', attrib: 'src' } }
      const scraper = new Iceberg(url)
      scraper.start(conf).then((json) => {
        expect(json).to.be.a('Object')
        expect(json.children).to.be.a('Array')
        json.children.should.have.lengthOf(1)
        expect(json.children[0].children).to.be.a('Array')
        json.children[0].selector.should.have.lengthOf(6)
        done()
      }).catch((err) => { done(err) })
    })
    it('Ensuring the results', (done) => {
      const url = 'http://www.insecam.org/en/byrating/'
      let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 4 }, selector: { element: 'img', attrib: 'src' } }
      const scraper = new Iceberg(url)
      scraper.start(conf).then((json) => {
        expect(json).to.be.a('Object')
        expect(json.children).to.be.a('Array')
        json.children.should.have.lengthOf(3)
        expect(json.children[0].children).to.be.a('Array')
       // json.selector.should.have.lengthOf(6)
        for (let i = 0; i < conf.iteratorElement.maxPage - 1; i++) {
          json.children[i].selector.should.have.lengthOf(6)
        }
        done()
      }).catch((err) => { done(err) })
    })
  })
})

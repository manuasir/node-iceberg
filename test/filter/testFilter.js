/* global describe it */

'use strict'

const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const Filter = require('../../lib/classes/filter')
const assert = require('assert')
const Iceberg = require('../../lib/classes/iceberg')
const confs = require('../../plugins/configurations')

describe('testing functions', () => {
  it('load module', (done) => {
    assert(Filter)
    done()
  })
  it(' filtering payload', async () => {
    try {
      const scraper = new Iceberg('https://estacion-katowice.blogspot.com')
      let conf = confs.services('blogspot')

      let DOM = await scraper.getDocumentData('https://estacion-katowice.blogspot.com')
      const filter = new Filter(DOM)
      assert(filter)
      expect(filter).to.be.a('object')
      let pay = filter.getElementsByFilter(conf.selector)
      expect(pay).to.be.a('array')
      pay.should.have.lengthOf(7)
      let theHrefs = filter.getFilteredHrefsWithAttribs(conf.iteratorElement)
      console.log(theHrefs)
      expect(theHrefs).to.be.a('object')
    } catch (err) {
      throw err
    }
  })
  it('passing no filter', async () => {
    try {
      const scraper = new Iceberg('https://estacion-katowice.blogspot.com')
      let conf = confs.services('blogspot')

      let DOM = await scraper.getDocumentData('https://estacion-katowice.blogspot.com')
      const filter = new Filter(DOM)
      expect(filter).to.be.a('object')
      let pay = filter.getElementsByFilter()
      expect(pay).to.be.a('array')
      expect(filter.getFilteredHrefsWithAttribs(conf.iteratorElement)).to.be.a('object')
      expect(filter.getFilteredHrefsWithAttribs(conf.iteratorElement)).to.be.a('object')
    } catch (err) {
      throw err
    }
  })
})

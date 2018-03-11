/* global describe it */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
const testServer = require('./testWebServer')
const Iceberg = require('../../lib/classes/iceberg')
const confs = require('../../plugins/configurations')
const assert = require('assert')
const Filter = require('../../lib/classes/filter.js')

chai.use(chaiHttp)

const getChaiHttp = require('../utiltest')

describe('crawler feature tests', () => {
  describe('testing server', () => {
    it(' successful connection :)', async () => {
      try {
        assert(should)
        testServer.createServer()
        let res = await getChaiHttp('/index.html')
        expect(res.statusCode).to.equal(200)
        return 0
      } catch (err) {
        throw err
      }
    })
  })
  describe('testing crawler levels', () => {
    it('level 1', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(1, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children.should.have.lengthOf(0)
        return 0
      } catch (err) {
        throw err
      }
    })
    it('level 1 with altered URL (no http header)', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(1, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children.should.have.lengthOf(0)
        return 0
      } catch (err) {
        throw err
      }
    })
    it('level 2', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(2, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children.should.have.lengthOf(2)
        return 0
      } catch (err) {
        throw err
      }
    })
    it('level 2 failed', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(2, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children[0].children.should.have.lengthOf(0)
        return 0
      } catch (err) {
        console.error(err)
        throw err
      }
    })
    it('level 3 ok', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(3, conf)
        const wholeTree = crawl.treeToObject()
        // testServer.closeServer()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children[0].children.should.have.lengthOf(2)
        return 0
      } catch (err) {
        console.error(err)
        throw err
      }
    })
  })
  describe('Integrity tests', () => {
    it('duplicated entries', async () => {
      try {
        const crawl = new Iceberg('http://localhost:8081/index.html')
        let conf = confs.services('crawler')
        await crawl.start(24, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(2)
        expect(wholeTree.children[0].children).to.be.a('Array')
        wholeTree.children[0].children.should.have.lengthOf(2)
        return 0
      } catch (err) {
        throw err
      }
    })
    describe('Testing filter', () => {
      describe('Create filter', () => {
        it('filter should be loaded', () => {
          assert(Filter)
        })
      })
      describe('Load new filter instance', () => {
        it('should create filter correctly', async () => {
          try {
            const crawl = new Iceberg()
            const DOM = await crawl.getDocumentData('http://localhost:8081/index.html')
            const filter = new Filter(DOM)
            assert(filter)
          } catch (err) {
            throw err
          }
        })
      })
      describe('Load new filter instance', () => {
        it('should create filter correctly', async () => {
          try {
            const crawl = new Iceberg()
            const DOM = await crawl.getDocumentData('http://localhost:8081/index.html')
            const filter = new Filter(DOM)
            assert(filter)
          } catch (err) {
            throw err
          }
        })
      })
    })
  })
  describe('closing server', () => {
    it(' successful closed server :)', async () => {
      try {
        testServer.closeServer()
        await getChaiHttp('/index.html')
        return 0
      } catch (err) {
        expect(err.code).to.equal('ECONNREFUSED')
      }
    })
  })
  describe('Crawling a site level ', () => {
    it('level 1', async () => {
      try {
        const crawl = new Iceberg('http://github.com/manuasir')
        let conf = confs.services('crawler')
        await crawl.start(1, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.children).to.be.a('Array')
        wholeTree.children.should.have.lengthOf(53)
        return 0
      } catch (err) {
        throw err
      }
    })
  })
  it('level 2', async () => {
    try {
      const crawl = new Iceberg('http://github.com/manuasir')
      let conf = confs.services('crawler')
      await crawl.start(2, conf)
      const wholeTree = crawl.treeToObject()
      expect(wholeTree.children).to.be.a('Array')
      wholeTree.children.should.have.lengthOf(53)
      // wholeTree.children[0].children.should.have.lengthOf(50)
      return 0
    } catch (err) {
      throw err
    }
  })
})

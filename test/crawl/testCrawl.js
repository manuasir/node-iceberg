/* global describe it */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
// const should = chai.should()
const testServer = require('./testWebServer')
const Crawler = require('../../lib/classes/crawler')
const confs = require('../../lib/util/configurations')

chai.use(chaiHttp)

const getChaiHttp = require('../utiltest')

describe('crawler feature tests', () => {
  describe('testing server', () => {
    it(' successful connection :)', async () => {
      try {
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
        const crawl = new Crawler('http://localhost:8081/index.html', 1)
        let conf = confs.services('crawler')
        await crawl.start(0, 1, conf)
        const wholeTree = crawl.treeToObject()
        expect(wholeTree.nextUrls).to.be.a('Array')
        wholeTree.nextUrls.should.have.lengthOf(2)
        expect(wholeTree.nextUrls[0].nextUrls).to.be.a('Array')
        wholeTree.nextUrls[0].nextUrls.should.have.lengthOf(0)
        return 0
      } catch (err) {
        throw err
      }
    })
    it('level 2', async () => {
      try {
        const crawl = new Crawler('http://localhost:8081/index.html', 1)
        let conf = confs.services('crawler')
        await crawl.start(0, 24, conf)
        const wholeTree = crawl.treeToObject()
        // testServer.closeServer()
        expect(wholeTree.nextUrls).to.be.a('Array')
        wholeTree.nextUrls.should.have.lengthOf(2)
        expect(wholeTree.nextUrls[0].nextUrls).to.be.a('Array')
        wholeTree.nextUrls[0].nextUrls.should.have.lengthOf(2)
        return 0
      } catch (err) {
        throw err
      }
    })
    it('duplicated entries', async () => {
      try {
        const crawl = new Crawler('http://localhost:8081/index.html', 1)
        let conf = confs.services('crawler')
        await crawl.start(0, 24, conf)
        const wholeTree = crawl.treeToObject()
        testServer.closeServer()
        expect(wholeTree.nextUrls).to.be.a('Array')
        wholeTree.nextUrls.should.have.lengthOf(2)
        expect(wholeTree.nextUrls[0].nextUrls).to.be.a('Array')
        wholeTree.nextUrls[0].nextUrls.should.have.lengthOf(2)
        return 0
      } catch (err) {
        throw err
      }
    })
  })
  describe('closing server', () => {
    it(' successful closed server :)', async () => {
      try {
        testServer.closeServer()
        console.log('closed server')
        await getChaiHttp('/index.html')
        return 0
      } catch (err) {
        // console.error(err)
        expect(err.code).to.equal('ECONNREFUSED')
        // throw err
      }
    })
  })
})

/* global describe it */

'use strict'

const chai = require('chai')
const expect = chai.expect
const utils = require('../../lib/util/utils')
const assert = require('assert')

describe('testing functions', () => {
  it('load module', (done) => {
    assert(utils)
    done()
  })
  it(' returns a url starting with http://', (done) => {
    const validUrl = utils.validUrl('www.localhost.es')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.localhost.es')
    done()
  })
  it(' returns a url starting with /', (done) => {
    const validUrl = utils.validUrl('/pricing', 'www.localhost.es')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.localhost.es//pricing')
    done()
  })
  it(' returns a url starting with /#', (done) => {
    const validUrl = utils.validUrl('/#pricing', 'www.localhost.es')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.localhost.es//#pricing')
    done()
  })
  it(' concat properly root and url ', (done) => {
    const validUrl = utils.validUrl('/manuasir/repositories.html', 'www.github.com/manuasir')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.github.com/manuasir/repositories.html')
    done()
  })
})

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
    const validUrl = utils.validUrl('www.localhost.es', 'www.localhost.es')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.localhost.es')
    done()
  })
  it(' returns a url starting with /', (done) => {
    const validUrl = utils.validUrl('/pricing', 'www.localhost.es')
    expect(validUrl).to.be.a('string')
    assert.equal(validUrl, 'http://www.localhost.es/pricing')
    done()
  })
})

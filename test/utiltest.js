/**
 * Created by manu on 21/11/16.
 */

const chai = require('chai'),
  chaiHttp = require('chai-http')

chai.use(chaiHttp)

/**
 *
 * @param {string}route
 * @param {?object}header
 * @param {?object}body
 * @param {function(err:?object, res:object)}callback
 */
module.exports = getChaiHttp = async (route, header, body) => {
  return await callRoute(route, header, body)
}
// const getChaiHttp = require('./utiltest');

/**
 * Perform HTTP request, get or post
 * @param route
 * @param header
 * @param body
 * @return {Promise}
 */
callRoute = async (route, header, body) => {
  return new Promise(function (resolve, reject) {
    header = header || {}
    if (!body) {
      // console.log("PETICION GET!",header);
      chai.request('http://localhost:8081')
        .get(route)
        .set(header)
        .end(function (err, res) {
          if (err) reject(err)
          resolve(res)
        })
    } else {
      // console.log("PETICION POST!");
      chai.request('http://localhost:8081')
        .post(route)
        .set(header)
        .send(body)
        .end((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    }
  })
}

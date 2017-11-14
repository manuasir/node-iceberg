'use strict'

const util = require('util')

/**
 * Get a well formed URL
 * @param uri
 * @return {*}
 */
exports.validUrl = function (uri) {
  let url
  if (uri && uri !== '') {
    let eq = uri.indexOf('h')
    if (eq !== 0) {
      url = 'http://' + uri
    } else { url = uri }
  }
  return url
}

/**
 * Delete Circular references in objects
 * @param obj
 * @return {*}
 */
exports.deleteCircular = function (obj) {
  return util.inspect(obj)
}

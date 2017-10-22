'use strict'

const util = require('util')

/**
 * Get a well formed URL
 * @param str
 * @return {*}
 */
exports.urlValid = function (str) {
  let url
  if (str && str !== '') {
    let httpExists = str.indexOf('http://', 0)
    if (httpExists != 0) {
      url = 'http://'+str
    } else { url = str }
  }
  return (str.indexOf('/') > -1) ? 'http://' + url : 'http://' + url + '/'
}

/**
 * Delete Circular references in objects
 * @param obj
 * @return {*}
 */
exports.deleteCircular = function (obj) {
  return util.inspect(obj)
}

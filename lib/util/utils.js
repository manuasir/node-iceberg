'use strict'

const util = require('util')

/**
 * Get a well formed URL
 * @param str
 * @return {*}
 */
exports.urlValid = function (str) {
  return (str.indexOf('/') > -1) ? 'http://' + str : 'http://' + str + '/'
}

/**
 * Delete Circular references in objects
 * @param obj
 * @return {*}
 */
exports.deleteCircular = function (obj) {
  return util.inspect(obj)
}

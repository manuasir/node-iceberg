'use strict'

const util = require('util')

/**
 * Get a well formed URL
 * @param urlToCheck
 * @param rootUrl
 * @return {*}
 */
exports.validUrl = (urlToCheck, rootUrl) => {
  let url = urlToCheck
  if (rootUrl.indexOf('http://') !== 0) { rootUrl = 'http://' + rootUrl }
  if (urlToCheck.indexOf('http://') !== 0 && (urlToCheck.indexOf('/') === 0 || urlToCheck.indexOf('#'))) { url = rootUrl + urlToCheck }
  if (url.indexOf('http://https://') === 0 || url.indexOf('http://http://') === 0) {
    let aux = url
    url = aux.slice(7, aux.length)
  }
  return url
}

/**
 * Delete Circular references in objects
 * @param obj
 * @return {*}
 */
exports.deleteCircular = (obj) => {
  return util.inspect(obj)
}

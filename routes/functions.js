'use strict'

let payloads = []

/**
 * Mapea los datos de los payloads en un solo nivel (recorrer el arbol)
 * @param data
 * @return {Array}
 */
exports.getPayloads = (data) => {
  if (!data || data.nextUrls.length <= 0 || !data.payload) { return 0 }

  payloads.push({url: data.url, payload: data.payload})

  for (let item of data.nextUrls) {
    this.getPayloads(item)
  }
  return payloads
}

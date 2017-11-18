'use strict'

const domainsToFilter = ['adf', 'paypal', 'mediafire', 'dropbox', 'box']

/**
 * Class Configuration: Default Configuration Sheets for filtering content.
 * Add new service sheets here
 * @param srv
 * @return {Object}
 */
exports.services = (srv) => {
  switch (srv) {
    case 'blogspot' : return { iteratorElement: { element: 'a', cssClass: 'blog-pager-older-link' }, selector: { element: 'a', attrib: 'href', values: domainsToFilter } }
    case 'crawler' : return { iteratorElement: {element: 'a'} }
  }
}

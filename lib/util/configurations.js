
/**
 * Clase Configuration: Plantillas de Configuraciones predeterminadas para filtrar contenido
 */
const domains = ['adf', 'paypal', 'mediafire', 'dropbox', 'box']
exports.services = function (srv) {
  switch (srv) {
    case 'blogspot': return { nextIteration: {element: 'a', cssClass: 'blog-pager-older-link'}, payload: { element: 'a', attrib: 'href', substrings: domains}}
    case 'crawler': return { nextIteration: {element: 'a'}}
  }
}

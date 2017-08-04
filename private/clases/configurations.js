
/**
 * Clase Configuration: Plantillas de Configuraciones predeterminadas para filtrar contenido
 */

exports.services = function(srv){
  switch(srv){
    case 'blogspot': return { nextIteration : {element:'a', cssClass:'blog-pager-older-link'}, payload : {element: 'a', attrib: 'href',substrings:['adf','paypal','mediafire','dropbox']}};
  }
}


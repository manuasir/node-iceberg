/**
 * Devuelve una URL bien formada
 * @param str
 * @return {*}
 */
exports.urlValid = function(str){
  var url;
  if(str.indexOf("/") > -1) {
    url = 'http://'+str;
  }
  else
    url = 'http://'+str+"/";
  return url;
}


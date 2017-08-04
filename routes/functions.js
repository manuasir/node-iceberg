
var payloads = []
/**
 * Mapea los datos de los payloads en un solo nivel (recorrer el arbol)
 * @param data
 * @return {Array}
 */
exports.getPayloads = function(data){
  if(data.nextUrls.length <= 0 || !data.payload)
    return;

  console.log("un push")
  payloads.push({url:data.url, payload:data.payload})

  for(var i=0;i<data.nextUrls.length;i++){
    console.log("llamando otra vez")
    this.getPayloads(data.nextUrls[i])
  }
  console.log("devolviendo payloads")
  return payloads
}
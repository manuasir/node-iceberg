var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var nodoSchema = new Schema({
	url: String,
  payload: Object,
	nextUrls: []
});

// the schema is useless so far
// we need to create a model using it
var Nodo = mongoose.model('Nodo', nodoSchema);

// make this available to our users in our Node applications
module.exports = Nodo;
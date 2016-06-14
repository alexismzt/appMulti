var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var estados_schema = new Schema({
	estado : String,
	clave : String
});

var Estado = mongoose.model("Estado", estados_schema);

module.exports.Estado = Estado;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Estados = mongoose.model('Estado');


ciudades_schema = new mongoose.Schema({
	idstate:{type: Schema.ObjectId, ref : "Estado"},
	idmuni:Number,
	municipio:String
});

var Ciudad = mongoose.model("Ciudad", ciudades_schema);
module.exports.Ciudad = Ciudad;
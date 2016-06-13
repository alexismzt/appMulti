var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = mongoose.model('User');

mongoose.connect("mongodb://localhost/Appmulti");

var agencia_schema = new Schema({
	nombre : {type: String, required: "El nombre es obligatorio" },
	contacto : {type: String, required: "El Correo de contacto es obligatorio", match:email_match},
	telefono : String,
	usuario : {type: Schema.ObjectId, ref : "User"}
});

var Agencia = mongoose.model("Agencia", agencia_schema);
module.exports = Agencia;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/Appmulti");

var sexo_vals = ["M", "F"];

var email_match = [/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]

var password_validator = {
			validator: function(p){
				return this.password_confirmation == p;
			},
			message : "Las contraseñas no son iguales"
		}

var user_schema = new Schema({
	name:String,
	password:{type:String, minlength:[6, "el password es muy corto"], validate: password_validator},	
	email:{type: String, required: "El Correo es obligatorio", match:email_match}	
}); //creamos el objeto--tabla-- en mongodb

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
})
;

var User = mongoose.model("User", user_schema); 

module.exports.User = User;

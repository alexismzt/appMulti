var express = require("express");
var bodyparser = require("body-parser");
var cookieSession = require("cookie-session");
var mongoose = require("mongoose");
var path = require('path');
var http = require('http');

////////////////////////////////
//middlewares
var session_middleware = require("./middlewares/sessions");
mongoose.connect("mongodb://localhost/Appmulti");

////////////////////////////
///Models
var User = require("./models/user").User;

///////////////////////////////
//Routing
var router_app = require("./routes");
var router_api = require("./routes_api");

var PORT = 8093;

/*Begin InitSite*/
console.log("Inicializando AppMultiversidad...")
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set("view engine", "pug");

app.use("/static",express.static('static')); //archivos estaticos

app.use(bodyparser.json()); //peticiones json
app.use(bodyparser.urlencoded({extended:true})); //peticiones URL
app.use(cookieSession({
    name: "session",
    keys: ["llave1", "llave2"]}
    )); //Cookies habilitadas

/*End InitSite*/

console.log("Inicializando URLS");

///////////////////////////////////////////
// Urls Views

//Index of Site
var Ciudad = require("./models/ciudades").Ciudad;
app.get("/", function(req, res){    
    res.render("index");
});

//Register new user 
//--display form
app.get("/singup", function(req, res){
	console.log("!Crear nuevo usuario¡");
	res.render("singup");
});

//--create the request resource
app.post("/singup", function(req, res){
	var user = new User({
            email:req.body.usuario, 
            password:req.body.password,
            password_confirmation: req.body.repassword,
            name: req.body.nombre
        });
    
    user.save().then(function(us){
        res.send("Guardamos tu usuario Exitosamente :)")
    }, function(err){
        if(err){
            console.log(String(err));
            res.send("No pudimos guardar tus datos! :(")
        }
    });
});

//loging in users registered
app.post("/login", function(req, res){
	User.findOne({email:req.body.usuario, password:req.body.password}, "", function(err,user){
        if(err){
            console.log(err);
            res.send("Error de contraseña");
        }
        else
        {
            if(user){
                req.session.user_id = user._id;
                res.redirect("/app");
            }
            else
            {
            	console.log(err);
            	res.send("Error de contraseña");
            }
        }
    });
});

console.log("Inicializando middlewares...");
app.use("/app", session_middleware);//middleware para sesiones

console.log("Inicializando routing...");
app.use("/app", router_app);
app.use("/api", router_api);

console.log("DONE!! \r\nEsuchando peticiones en el puerto:" + app.get('port'));
//app.listen(PORT);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
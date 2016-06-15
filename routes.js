var express = require("express");

var router_app = express.Router();

router_app.get("/", function(req, res){
    res.render("app/home")
});

router_app.get("/demostration", function(req, res){
    res.render("app/demo")
});

router_app.get('/partials/:name', function(req, res, next){
    var name = req.params.name;
    res.render('partials/' + name);
});

module.exports = router_app;
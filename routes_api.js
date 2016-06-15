var express = require("express");

var router = express.Router();

var Estado = require("./models/estados").Estado;
var Ciudad = require("./models/ciudades").Ciudad;

router.route("/estados/:id")
    .get(function(req, res){
        Estado.findById(req.params.id, function(err, estado){
            res.send(estado);
        });
    })
    .put(function(req, res){

    })
    .delete(function(req, res){

    });

router.route("/estados/ciudades/:id")
    .get(function(req, res){
        Ciudad.find({idstate:req.params.id},function(err, ciudades){
            Estado.populate(ciudades, {path: 'idstate'},
            	function(err, ciudades){
                res.status(200).send(ciudades);
            })
        });
    })
    .put(function(req, res){

    })
    .delete(function(req, res){

    });

router.route("/estados/")
    .get(function(req, res){
        Estado.find({},function(err, estados){
            res.send(estados);
        });
    })
    .post(function(req, res){

    });

router.route("/ciudades/:id")
    .get(function(req, res){
        Ciudad.findById(req.params.id,function(err, cities){
            Estado.populate(ciudades, {path: 'idstate'},
            	function(err, ciudades){
                res.status(200).send(ciudades);
            })
        });
    });

router.route("/ciudades")
    .get(function(req, res){
        Ciudad.find(function(err, ciudades){
        	Estado.populate(ciudades, {path: 'idstate'},
            	function(err, ciudades){
                res.status(200).send(ciudades);
            })
    });
    })
    .post(function(req, res){
    });

 module.exports = router;
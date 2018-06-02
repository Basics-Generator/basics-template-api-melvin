var bodyParser      = require('body-parser');            // Charge le middleware de gestion des paramètres
var randomstring    = require("randomstring");
var validator       = require("email-validator");
var bcrypt          = require('bcrypt');
const saltRounds    = 10;

var Authenticate    = require("../../../models/authenticate.js");

////////////////////////////////////////////////////////////
/////////////       REGISTER USER               //////////// 
////////////////////////////////////////////////////////////
exports.register = function(req, res, next) {
    console.log("REGISTER");
    if (req.body.email != null && req.body.password != null && req.body.secret != "je suis l'admin et c'est pas autrement") {
        if (validator.validate(req.body.email)){
            if (req.body.password.length > 6){
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    var token = randomstring.generate();
                    Authenticate.create({
                        email : req.body.email,
                        password : hash,
                        token : token
                    }, 
                    function(err, authenticate) {
                        if (err)
                            res.send(err);
                        res.status(201).send({
                            endpoint: "POST register",
                            message: "Register success"
                        });
                    });
                });    
            }
            else {
                res.status(400).send({
                    endpoint: "POST register",
                    message: "Invalid Password (lenght need to be greater than 6)"
                });
            }
        }
        else {
            res.status(400).send({
                endpoint: "POST register",
                message: "Invalid Email"
            });
        }
    }
    else {
        res.status(400).send({
            endpoint: "POST register",
            message: "Invalid parameters"
        });
    }
} 

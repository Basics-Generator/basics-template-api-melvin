var bodyParser      = require('body-parser');            // Charge le middleware de gestion des paramètres
var validator       = require("email-validator");
var bcrypt          = require('bcrypt');
const saltRounds    = 10;

var Authenticate    = require("../../../models/authenticate.js");

////////////////////////////////////////////////////////////
/////////////////       POST LOGIN             ///////////// 
//////////////////////////////////////////////////////////// 
exports.login = function(req, res, next) {
    if (validator.validate(req.body.email) == false) {
        res.status(400).send({
            endpoint: "POST Login",
            message: "Invalid email"
        });
        return;
    }
    Authenticate.findOne({email : req.body.email}, function(err, authenticate) {
        if (err)
            res.send(err)
        if (authenticate) {            
            bcrypt.compare(req.body.password, authenticate.password, function(err, passwordMatch) {
                if (passwordMatch) {
                    res.status(201).send({
                        endpoint: "POST Login",
                        message: "Login success",
                        id: authenticate.id,
                        email: authenticate.email,
                        token: authenticate.token
                    });
                }
                else {
                    res.status(404).send({
                        endpoint: "POST Login",
                        message: "2 - User doesn't exist"
                    });
                }  
            });
        }
        else {
            res.status(404).send({
                endpoint: "POST Login",
                message: "1 - User doesn't exist"
            });
        } 

    });
}

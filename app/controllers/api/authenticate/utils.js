var bodyParser      = require('body-parser');            // Charge le middleware de gestion des paramètres

var Authenticate    = require("../../../models/authenticate.js");

////////////////////////////////////////////////////////////
/////////////       VERIFICATION TOKEN          //////////// 
////////////////////////////////////////////////////////////          
exports.isAuth = function (req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if (token) {
        Authenticate.findOne({token : token}, function(err, authenticate) {
            if (err)
                res.send(err)
            if (authenticate) {
                next();
            }
            else {
                res.status(404).send({
                    endpoint: "Is AUTH",
                    message: "User doesn't exist"
                });
            }  
        });
    }
    else {
        res.status(400).send({
            endpoint: "Is AUTH",
            message: "Token doesn't exist"
        });
    }
}

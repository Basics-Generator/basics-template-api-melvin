var bodyParser      = require('body-parser');            // Charge le middleware de gestion des paramètres

var SessionAuth    = require("../../../models/user/sessionAuth.js");

////////////////////////////////////////////////////////////
/////////////       VERIFICATION TOKEN          //////////// 
////////////////////////////////////////////////////////////          
exports.isAuth = function (req, res, next) {
    var token = req.body.authorization || req.params.authorization || req.headers['authorization'];
    if (token) {
        SessionAuth.findOne({token : token}).populate('user').exec(function(err, sessionAuth) {
            if (err) throw err;
            if (sessionAuth) {
                req.user = sessionAuth.user
                next();
            }
            else {
                res.status(401).send({
                    endpoint: "VERIFICATION TOKEN",
                    message: "User doesn't exist"
                });
            }  
        });
    }
    else {
        res.status(403).send({
            endpoint: "VERIFICATION TOKEN",
            message: "Missing header token"
        });
    }
}
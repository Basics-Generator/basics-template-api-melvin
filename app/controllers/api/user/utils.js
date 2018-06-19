var bodyParser      = require('body-parser');            // Charge le middleware de gestion des paramètres
let date            = require('date-and-time');

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
                if (tokenIsExpired(sessionAuth)) {
                    res.status(401).send({
                        endpoint: "VERIFICATION TOKEN",
                        message: "Token is expired"
                    });
                }
                else {
                    req.user = sessionAuth.user
                    next();                    
                }
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

function tokenIsExpired(sessionAuth) {
    var now = new Date();
    now.setTime(now.getTime() + (2*60*60*1000)); 
    var diffMs = (now - sessionAuth.createdAt);
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var nb_minutes = (diffDays * 1440) + (diffHrs * 60) + (diffMins);
    if (nb_minutes > 240) {
        return true;
    }
    return false;
} 
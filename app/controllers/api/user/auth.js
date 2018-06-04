var User                = require('../../../models/user/user');
var SessionAuth         = require("../../../models/user/sessionAuth.js");

var ResponseGenerator   = require('../../../helper/ResponseGenerator');
var randomstring        = require("randomstring");
var bodyParser          = require('body-parser');
var bcrypt              = require('bcrypt');

const saltRounds        = 10;

////////////////////////////////////////////////////////////
/////////////////       POST LOGIN             ///////////// 
//////////////////////////////////////////////////////////// 
exports.login = function(req, res) {
    if (req.body.username == undefined || req.body.password == undefined) {
        return ResponseGenerator.getInstance().generate(res, "CREATE SESSION AUTH", 400, 'Missing parameters');
    }

    if (req.body.username == "" || req.body.password == "") {
        return ResponseGenerator.getInstance().generate(res, "CREATE SESSION AUTH", 400, 'Empty parameters');
    }

    User.findOne({username : req.body.username}, function(err, user) {
        if (err) throw err;
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, passwordMatch) {
                if (passwordMatch) {
                    createSessionAuth(user, req, res, function(res, token) {
                        return ResponseGenerator.getInstance().generateLogin(res, "CREATE SESSION AUTH", 201, 'Session Auth created successfully', token)
                    });
                }
                else {
                    return ResponseGenerator.getInstance().generate(res, "CREATE SESSION AUTH", 404, '2 - User doesn\'t exist')
                }  
            });
        }
        else {
            return ResponseGenerator.getInstance().generate(res, "CREATE SESSION AUTH", 404, '1 - User doesn\'t exist')
        }
    });
}

exports.refresh = function(req, res) {
    if (req.body.access_token == undefined || req.body.refresh_token == undefined) {
        return ResponseGenerator.getInstance().generate(res, "REFRESH SESSION AUTH", 400, 'Missing parameters');
    }

    if (req.body.access_token == "" || req.body.refresh_token == "") {
        return ResponseGenerator.getInstance().generate(res, "REFRESH SESSION AUTH", 400, 'Empty parameters');
    }

    SessionAuth.findOne({token : req.body.access_token}).populate('user').exec(function(err, sessionAuth) {
        if (err) throw err;
        if (sessionAuth) {
            User.findOne({refreshToken : req.body.refresh_token}, function(err, user) {
                if (err) throw err;
                if (sessionAuth.user.username == user.username) {
                    createSessionAuth(user, req, res, function(res, token) {
                        return ResponseGenerator.getInstance().generateLogin(res, "REFRESH SESSION AUTH", 201, 'Session Auth created successfully', token)
                    });
                }
                else {
                    return ResponseGenerator.getInstance().generate(res, "REFRESH SESSION AUTH", 404, '2 - User doesn\'t exist')
                }
            });
        }
        else {
            res.status(404).send({
                endpoint: "REFRESH SESSION AUTH",
                message: "1 - User doesn't exist"
            });
        }  
    });

}

function createSessionAuth(user, req, res, successCallback) {
    var token = randomstring.generate(64);
    var newSessionAuth = new SessionAuth({
        user            : user, 
        token           : token,
        createdAt       : Date()
    });     
    newSessionAuth.save(function(err) {
        if (err) throw err;
        user.sessionAuth = newSessionAuth;
        user.save(function(err) {
            if (err) throw err;
            successCallback(res, token);
        });
    });
}
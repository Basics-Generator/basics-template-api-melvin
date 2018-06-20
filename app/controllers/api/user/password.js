var User                    = require('../../../models/user/user');
var SessionChangePassword   = require("../../../models/user/sessionChangePassword.js");

var ResponseGenerator       = require('../../../helper/ResponseGenerator');
var Mailer                  = require('../../../helper/Mailer');

var randomstring            = require("randomstring");
var bcrypt                  = require('bcrypt');

const saltRounds            = 10;
const url                   = "localhost:3000/forgotPassword?token=";

////////////////////////////////////////////////////////////
/////////          PUT CHANGE PASSWORD         ////////////
////////////////////////////////////////////////////////////
exports.change = function(req, res) {
    if (req.body.password == undefined) {
        return ResponseGenerator.getInstance().generate(res, "CHANGE PASSWORD", 400, 'Missing parameters');
    }

    if (req.body.password == "") {
        return ResponseGenerator.getInstance().generate(res, "CHANGE PASSWORD", 400, 'Empty parameters');
    }

    if (req.body.password.length < 7) {
        return ResponseGenerator.getInstance().generate(res, "CHANGE PASSWORD", 400, 'Invalid Password (lenght need to be greater than 6)')
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) throw err;
        req.user.password = hash;
        req.user.save(function(err) {
            if (err) throw err;
            Mailer.getInstance().sendMail(req.user, 'Password update', 'You have change your password');
            return ResponseGenerator.getInstance().generate(res, "CHANGE PASSWORD", 204, 'Change password successfully');
        });
    });
}

////////////////////////////////////////////////////////////
/////////          POST FORGOT PASSWORD         ////////////
////////////////////////////////////////////////////////////
exports.forgot = function(req, res) {
    if (req.body.email == undefined) {
        return ResponseGenerator.getInstance().generate(res, "FORGOT PASSWORD", 400, 'Missing parameters');
    }

    if (req.body.email == "") {
        return ResponseGenerator.getInstance().generate(res, "FORGOT PASSWORD", 400, 'Empty parameters');
    }

    User.findOne({email : req.body.email}, function(err, user) {
        if (err) throw err;
        if (user) {
            createSessionChangePassword(user, req, res, function(res) {
                return ResponseGenerator.getInstance().generate(res, "FORGOT PASSWORD", 201, 'User receive an email with a temporary link to change password')
            });
        }
        else {
            return ResponseGenerator.getInstance().generate(res, "FORGOT PASSWORD", 404, 'User doesn\'t exist')
        }
    });
}

function createSessionChangePassword(user, req, res, successCallback) {
    var token = randomstring.generate(64);
    var newSessionChangePassword = new SessionChangePassword({
        user            : user, 
        token           : token,
        createdAt       : Date()
    });     
    newSessionChangePassword.save(function(err) {
        if (err) throw err;
        user.sessionChangePassword = newSessionChangePassword;
        user.save(function(err) {
            if (err) throw err;
            var message = 'Here, a link to update your password: ' + url + newSessionChangePassword.token;
            Mailer.getInstance().sendMail(user, 'Password update', message);
            successCallback(res);
        });
    });
}
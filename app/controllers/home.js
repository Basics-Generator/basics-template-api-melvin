var express 					= require('express');
var bcrypt						= require('bcrypt-nodejs');
var moment 						= require('moment');

var router = express.Router();

exports.home = function(req, res) {
	res.render('home.ejs', {});
}

exports.forgotPassword = function(req, res) {
	res.render('forgotPassword.ejs', {});
}
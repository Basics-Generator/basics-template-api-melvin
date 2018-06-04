var express 					= require('express');
var User  						= require('../../../models/user'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

var randomstring    			= require("randomstring");
var validator       			= require("email-validator");
var bcrypt          			= require('bcrypt');
var fs 							= require('fs');

const saltRounds    			= 10;

////////////////////////////////////////////////////////////
////////////       POST CREATE USER             ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {

	if (req.body.username == undefined || req.body.password == undefined || req.body.lastname == undefined || req.body.firstname == undefined ||
		req.body.email == undefined || req.body.phone == undefined || req.body.country == undefined || req.body.city == undefined ||
		req.body.postalCode == undefined || req.body.adress == undefined || req.body.birthday == undefined || req.body.description == undefined ||
		req.files.photo == undefined) {
		return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Missing parameters');
	}

	if (req.body.username == "" || req.body.password == "" || req.body.lastname == "" || req.body.firstname == "" ||
		req.body.email == "" || req.body.phone == "" || req.body.country == "" || req.body.city == "" ||
		req.body.postalCode == "" || req.body.adress == "" || req.body.birthday == "" || req.body.description == "") {
		return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Empty parameters');
	}

	User.findOne({username: req.body.username}).exec(function(err, user){
		if (err) throw err;
		if (user) { return ResponseGenerator.getInstance().generate(res, "CREATE USER", 409, 'Username already exist'); }
		if (validator.validate(req.body.email)){
            if (req.body.password.length > 6){
                createUser(req, res, function(res) {
                	return ResponseGenerator.getInstance().generate(res, "CREATE USER", 201, 'User created successfully')
				});
            }
            else {
                return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid Password (lenght need to be greater than 6)')
            }
        }
        else {
            return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid email')
        }
	});
}

function createUser(req, res, successCallback) {
	fs.readFile(req.files.photo.path, function (err, data_photo) {
		if (err) throw err;
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			if (err) throw err;
            var refreshToken = randomstring.generate(32);
            var generated_photo_name = randomstring.generate(32);
			var photo_path = __dirname + "/../../../../public/uploads/photo/" + generated_photo_name;
			fs.writeFile(photo_path, data_photo, function (err) {
				if (err) throw err;
				var newU = new User({
					username		: req.body.username,
					password		: hash,
					lastname		: req.body.lastname,
					firstname		: req.body.firstname,
					email			: req.body.email,
					phone			: req.body.phone,
					country			: req.body.country,
					city			: req.body.city,
					postalCode		: req.body.postalCode,
					adress			: req.body.adress,
					birthday		: req.body.birthday,
					description		: req.body.description,
					refreshToken	: refreshToken,
					photo			: "/uploads/photo/" + generated_photo_name,
					photoThumb		: "/uploads/photo/" + generated_photo_name,
					createdAt		: Date(),
					updateAt		: Date(),
					enabled			: true,
					sessionsAuth	: null
				});	

				newU.save(function(err) {
					if (err) throw err;
					successCallback(res);
				});
			});
		});
	});
}

exports.profile = function(req, res) {
	return res.status(200).send({ endpoint: "GET PROFILE", message: "Get user profile successfully", user:req.user });
}
var express 					= require('express');
var User  						= require('../../models/user'); // get our mongoose model
var ResponseGenerator       	= require('../../helper/ResponseGenerator'); // get our mongoose model

var fs 							= require('fs');

var router = express.Router();
exports.create = function(req, res) {
	if (req.body.email == "" || req.body.name == "" || req.body.username == "" || req.body.role == "" || req.body.desc == "" ||
		req.body.experience == "" || req.body.phone == "" || req.files.avatar == undefined || req.files.cv == undefined || 
		req.body.linkedin == undefined || req.body.fb == undefined || req.body.twitter == undefined || req.body.gmail == undefined) {
		return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Missing parameters');
	}

	User.findOne({email:req.body.email, username: req.body.username}).exec(function(err, user){
		if (err) throw err;
		if (user) { return ResponseGenerator.getInstance().generate(res, "CREATE USER", 409, 'Email or username already exist'); }
		fs.readFile(req.files.cv.path, function (err, data_cv) {
			var cv_path = __dirname + "/../../../public/uploads/cv/" + req.files.cv.name;
			fs.writeFile(cv_path, data_cv, function (err) {
				fs.readFile(req.files.avatar.path, function (err, data_avatar) {
					var avatar_path = __dirname + "/../../../public/uploads/avatar/" + req.files.avatar.name;
					fs.writeFile(avatar_path, data_avatar, function (err) {
						var newU = new User({
							email			: req.body.email, 
							name			: req.body.name, 
							username		: req.body.username, 
							role			: req.body.role,
							desc			: req.body.desc,
							experiencedesc	: req.body.experience,
							phone			: req.body.phone,
							date			: Date(),
							active			: false,
							cv				: "/uploads/cv/" + req.files.cv.name,
							avatar			: "/uploads/avatar/" + req.files.avatar.name,
							linkedin		: req.body.linkedin,
							twitter			: req.body.twitter,
							fb				: req.body.fb,
							gmail			: req.body.gmail
						});		
						newU.save(function(err) {
							if (err) throw err;
							return ResponseGenerator.getInstance().generate(res, "CREATE USER", 201, 'User created successfully')
						});
					});
				});
			});
		});
	});
}

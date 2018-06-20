var Event  						= require('../../../models/event/event'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model


////////////////////////////////////////////////////////////
////////////       POST CREATE EVENT            ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {
	if (req.body.title == undefined 
		|| req.body.description == undefined
		|| req.body.startDate == undefined 
		|| req.body.endDate == undefined) {
		return ResponseGenerator.getInstance().generate(res, "CREATE EVENT", 400, 'Missing parameters');
	}

	if (req.body.title == ""
		|| req.body.description == ""
		|| req.body.startDate == ""
		|| req.body.endDate == "") {
		return ResponseGenerator.getInstance().generate(res, "CREATE EVENT", 400, 'Empty parameters');
	}

	if (new Date(req.body.startDate) < new Date()
		|| new Date(req.body.startDate) > new Date(req.body.endDate)) {
		return ResponseGenerator.getInstance().generate(res, "CREATE EVENT", 409, 'Wrong dates');
	}
	else {
		createEvent(req, res, function(res) {
			return ResponseGenerator.getInstance().generate(res, "CREATE EVENT", 201, 'Event created successfully')
		});
	}



	// Event.find({$or:[ {'username': req.body.username}, {'email': req.body.email}]} , function(err, users) {
	// 	if (err) throw err;
	// 	if (users.length > 0) { return ResponseGenerator.getInstance().generate(res, "CREATE USER", 409, 'Email or username already exist'); }
	// 	if (validator.validate(req.body.email)) {
 //        	if (req.body.password.length > 6) {
 //                createUser(req, res, function(res) {
 //                	return ResponseGenerator.getInstance().generate(res, "CREATE USER", 201, 'User created successfully')
	// 			});
 //            }
 //            else {
 //                return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid Password (lenght need to be greater than 6)')
 //            }
 //        }
 //        else {
 //            return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid email')
 //        }

	// });
}

function createEvent(req, res, successCallback) {
	var newEvent = new Event({
		event_title		: req.body.title,
		description		: req.body.description,
		startDate		: req.body.startDate,
		endDate			: req.body.endDate
	});

	newEvent.save(function(err) {
		if (err) throw err;
		successCallback(res);
	});
}

// function createUser(req, res, successCallback) {
// 	fs.readFile(req.files.photo.path, function (err, data_photo) {
// 		if (err) throw err;
// 		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
// 			if (err) throw err;
//             var refreshToken = randomstring.generate(32);
//             var generated_photo_name = randomstring.generate(32);
// 			var photo_path = __dirname + "/../../../../public/uploads/photo/" + generated_photo_name;
// 			fs.writeFile(photo_path, data_photo, function (err) {
// 				if (err) throw err;
// 				var newU = new User({
// 					username				: req.body.username,
// 					password				: hash,
// 					lastname				: req.body.lastname,
// 					firstname				: req.body.firstname,
// 					email					: req.body.email,
// 					phone					: req.body.phone,
// 					country					: req.body.country,
// 					city					: req.body.city,
// 					postalCode				: req.body.postalCode,
// 					adress					: req.body.adress,
// 					birthday				: req.body.birthday,
// 					description				: req.body.description,
// 					refreshToken			: refreshToken,
// 					photo					: "/uploads/photo/" + generated_photo_name + path.extname(req.files.photo.path),
// 					photoThumb				: "/uploads/photo/" + generated_photo_name + path.extname(req.files.photo.path),
// 					createdAt				: Date(),
// 					updateAt				: Date(),
// 					enabled					: true,
// 					sessionsAuth			: null,
// 					sessionsChangePassword	: null
// 				});	

// 				newU.save(function(err) {
// 					if (err) throw err;
// 					successCallback(res);
// 				});
// 			});
// 		});
// 	});
// }

exports.list = function(req, res) {
	return res.status(200).send({ endpoint: "GET EVENT", message: "Get event successfully", event:req.event });
}
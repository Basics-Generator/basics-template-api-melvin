var Event  						= require('../../../models/event/event'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
////////////       POST CREATE EVENT            ////////////
//////////////////////////////////////////////////////////// 
exports.add = function(req, res) {
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
		addEvent(req, res, (res) => {
			return ResponseGenerator.getInstance().generate(res, "CREATE EVENT", 201, 'Event created successfully')
		});
	}
}

////////////////////////////////////////////////////////////
////////////            CREATE EVENT            ////////////
//////////////////////////////////////////////////////////// 
function addEvent(req, res, successCallback) {
	var newEvent = new Event({
		user			: req.user,
		title           : req.body.title,
		description		: req.body.description,
		startDate		: req.body.startDate,
		endDate			: req.body.endDate
	});

	newEvent.save((err) => {
		if (err) throw err;
		successCallback(res);
	});
}

////////////////////////////////////////////////////////////
////////////              GET EVENT             ////////////
//////////////////////////////////////////////////////////// 
exports.list = (req, res) => {
	Event.find({}).exec((err, events) => {
		if (err) throw err;
		return res.status(200).send({ endpoint: "GET EVENT", message: "Get events list successfully", events:events });
	});
}

////////////////////////////////////////////////////////////
////////////       GET EVENT W/ USER            ////////////
//////////////////////////////////////////////////////////// 
exports.all = (req, res) => {
	Event.find({}).populate('user').exec((err, events) => {
		if (err) throw err;
		return res.status(200).send({ endpoint: "GET EVENT", message: "Get events list successfully", events:events });
	});
}
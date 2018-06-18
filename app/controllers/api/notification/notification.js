var Notification  				= require('../../../models/notification/notification'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
////////////        GET LIST NOTIFICATION       ////////////
//////////////////////////////////////////////////////////// 
exports.list = function(req, res) {
	Notification.find({user: req.user}).exec(function(err, notifications) {
		if (err) throw err;
		return res.status(200).send({ endpoint: "LIST NOTIFICATION", message: "Get list notifications successfully", notifications:notifications });
	});
}
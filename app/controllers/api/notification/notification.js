var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
////////////        GET LIST NOTIFICATION       ////////////
//////////////////////////////////////////////////////////// 
exports.list = function(req, res) {
	return ResponseGenerator.getInstance().generate(res, "LIST NOTIFICATION", 200, 'Get list notifications successfully')
}

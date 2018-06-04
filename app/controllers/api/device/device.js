var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
////////////        CREATE DEVICE TOKEN          ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {
	return ResponseGenerator.getInstance().generate(res, "CREATE DEVICE TOKEN", 201, 'Device token created successfully')
}

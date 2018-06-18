var Comment  					= require('../../../models/comment/comment'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
/////////           POST CREATE COMMENT         ////////////
////////////////////////////////////////////////////////////
exports.create = function(req, res) {
    if (req.body.obj == undefined || req.body.message == undefined) {
        return ResponseGenerator.getInstance().generate(res, "CREATE COMMENT", 400, 'Missing parameters');
    }

    if (req.body.obj == "" || req.body.message == "") {
        return ResponseGenerator.getInstance().generate(res, "CREATE COMMENT", 400, 'Empty parameters');
    }

    createComment(req, res, function(res) {
        return ResponseGenerator.getInstance().generate(res, "CREATE COMMENT", 201, 'User comment create success and will be read quickly')
    });
}

function createComment(req, res, successCallback) {
    var newComment = new Comment({
        user            : req.user, 
        object          : req.body.obj,
        message         : req.body.message,
        createdAt       : Date()
    });     
    newComment.save(function(err) {
        if (err) throw err;
        successCallback(res);
    });
}
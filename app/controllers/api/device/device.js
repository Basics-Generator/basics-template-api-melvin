var Device                      = require('../../../models/device/device'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

////////////////////////////////////////////////////////////
////////////        CREATE DEVICE TOKEN          ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {
    if (req.body.device_token == undefined) {
        return ResponseGenerator.getInstance().generate(res, "CREATE DEVICE TOKEN", 400, 'Missing parameters');
    }

    if (req.body.device_token == "") {
        return ResponseGenerator.getInstance().generate(res, "CREATE DEVICE TOKEN", 400, 'Empty parameters');
    }

    createDevice(req, res, function(res) {
        return ResponseGenerator.getInstance().generate(res, "CREATE DEVICE TOKEN", 201, 'User device token created success')
    });
}

function createDevice(req, res, successCallback) {
    var newDevice = new Device({
        user            : req.user, 
        deviceToken     : req.body.device_token,
        createdAt       : Date()
    });     
    newDevice.save(function(err) {
        if (err) throw err;
        successCallback(res);
    });
}
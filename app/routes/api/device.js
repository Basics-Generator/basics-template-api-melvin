var express                 = require('express');
var router                  = express.Router();

var utils            		= require('../../controllers/api/user/utils.js'); 
var device            		= require('../../controllers/api/device/device.js'); 

router.post('/', utils.isAuth, device.create);  //CREATE DEVICE TOKEN

module.exports = router;
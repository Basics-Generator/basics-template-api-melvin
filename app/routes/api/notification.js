var express                 = require('express');
var router                  = express.Router();

var utils            		= require('../../controllers/api/user/utils.js'); 
var notification            = require('../../controllers/api/notification/notification.js'); 

router.get('/', utils.isAuth, notification.list);  //GET NOTIFICATION USER

module.exports = router;
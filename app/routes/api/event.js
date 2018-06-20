var express                 = require('express');
var router                  = express.Router();

var utils            		= require('../../controllers/api/user/utils.js'); 
var event            		= require('../../controllers/api/event/event.js'); 

var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

router.post('/create', utils.isAuth, multipartMiddleware, event.create);  //CREATE EVENT
router.get('/list', utils.isAuth, event.list);

module.exports = router;
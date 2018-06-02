var express                 = require('express');
var app                     = express();
var router                  = express.Router();
var user            		= require('../../controllers/api/user.js'); 

var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

router.post('/', multipartMiddleware, user.create);

module.exports = router;
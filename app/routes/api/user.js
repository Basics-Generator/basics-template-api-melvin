var express                 = require('express');
var app                     = express();
var router                  = express.Router();
var user            		= require('../../controllers/api/user.js'); 
var utils            		= require('../../controllers/api/authenticate/utils.js'); 

var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

router.post('/', utils.isAuth, multipartMiddleware, user.create);

module.exports = router;
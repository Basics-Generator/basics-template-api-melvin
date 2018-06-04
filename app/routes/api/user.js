var express                 = require('express');
var router                  = express.Router();

var user            		= require('../../controllers/api/user/user.js'); 
var auth            		= require('../../controllers/api/user/auth.js'); 
var utils            		= require('../../controllers/api/user/utils.js');
var password            	= require('../../controllers/api/user/password.js'); 


var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

router.post('/login', auth.login); //CREATE SESSION AUTH
router.post('/refresh', auth.refresh); //REFRESH SESSION AUTH

router.post('/', multipartMiddleware, user.create); //CREATE USER
router.get('/', utils.isAuth, user.profile);  //GET PROFILE USER

router.post('/forgotPassword', password.forgot); //Forgot password
router.put('/changePassword', utils.isAuth, password.change); //Change password

module.exports = router;
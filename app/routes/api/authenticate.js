var express                 = require('express');
var app                     = express();
var router                  = express.Router();

var login            		= require('../../controllers/api/authenticate/login.js'); 
var register            	= require('../../controllers/api/authenticate/register.js');

router.post('/login', 			login.login);
router.post('/register', 		register.register);

module.exports = router;
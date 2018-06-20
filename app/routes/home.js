var express                 = require('express');
var router                  = express.Router();
var home            		= require('../controllers/home.js'); 

router.get('/', home.home);
router.get('/forgotPassword', home.forgotPassword);

module.exports = router;
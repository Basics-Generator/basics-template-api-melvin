var express                 = require('express');
var router                  = express.Router();

var utils            		= require('../../controllers/api/user/utils.js'); 
var comment            		= require('../../controllers/api/comment/comment.js'); 

router.post('/', utils.isAuth, comment.create);  //GET NOTIFICATION USER

module.exports = router;
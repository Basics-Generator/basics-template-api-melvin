const express             = require('express');
const router              = express.Router();

const utils               = require('../../controllers/api/user/utils.js'); 
const event               = require('../../controllers/api/event/event.js'); 

const multipart           = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/add', utils.isAuth, multipartMiddleware, event.add);  //CREATE EVENT
router.get('/list', utils.isAuth, event.list);
router.get('/all', utils.isAuth, event.all);

module.exports = router;
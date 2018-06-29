const express             = require('express');
const router              = express.Router();

const utils               = require('../../controllers/api/user/utils.js'); 
const place               = require('../../controllers/api/place/place.js'); 

const multipart           = require('connect-multiparty');
const multipartMiddleware = multipart();

router.get('/add', place.get);
router.post('/add', multipartMiddleware, place.add);  //CREATE PLACE
router.get('/list', place.list);

module.exports = router;
var express                 = require('express');
var app                     = express();
var router                  = express.Router();
var home            		= require('../controllers/home.js'); 
var bodyParser              = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser        = bodyParser.urlencoded({ extended: false });


router.get('/', home.home);

module.exports = router;
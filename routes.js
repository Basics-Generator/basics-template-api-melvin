var express                 = require('express');
var app                     = express();
var router                  = express.Router();

var home                 	= require("./app/routes/home");
var user                 	= require("./app/routes/api/user.js");

router.use("/", home);
router.use("/api/user", user);


module.exports = router;
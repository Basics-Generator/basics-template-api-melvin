var express                 = require('express');
var app                     = express();
var router                  = express.Router();

var home                 	= require("./app/routes/home");
var user                 	= require("./app/routes/api/user.js");
var device                 	= require("./app/routes/api/device.js");
var notification            = require("./app/routes/api/notification.js");

router.use("/", home);
router.use("/api/user", user);
router.use("/api/device", device);
router.use("/api/notification", notification);


module.exports = router;
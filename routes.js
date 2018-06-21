var express                 = require('express');
var router                  = express.Router();

var home                 	= require("./app/routes/home");
var user                 	= require("./app/routes/api/user.js");
var device                 	= require("./app/routes/api/device.js");
var notification            = require("./app/routes/api/notification.js");
var comment            		= require("./app/routes/api/comment.js");
var event            		= require("./app/routes/api/event.js");

router.use("/", home);
router.use("/api/user", user);
router.use("/api/device", device);
router.use("/api/notification", notification);
router.use("/api/comment", comment);
router.use("/api/event", event);


module.exports = router;
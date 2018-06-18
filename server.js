var express 		= require('express');
var mongoose      	= require('mongoose');
var config        	= require('./config');
var route        	= require('./routes.js');
var app 			= express();

var bodyParser      = require('body-parser');

const PORT 			= process.env.PORT || 3000

var options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};
console.log(config.database);
mongoose.connect(config.database, options);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('/app/views', __dirname + '/app/views');
app.set('views engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(route); 

app.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
});

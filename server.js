const express 	 = require('express');
const mongoose   = require('mongoose');
const config     = require('./config');
const route      = require('./routes.js');

const app 			 = express();

const bodyParser = require('body-parser');

const PORT 			 = process.env.PORT || 3000

var options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};
mongoose.connect(config.database, options);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/app/views');
app.set('views engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use(route); 

app.listen(PORT, () => {
  console.log(`Node app is running on port ${PORT}`);
});
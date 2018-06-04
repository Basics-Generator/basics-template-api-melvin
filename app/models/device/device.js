var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	deviceToken		: 	String,
	createdAt		: 	String
});

module.exports = mongoose.model('device', deviceSchema);
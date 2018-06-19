var mongoose = require('mongoose');

var sessionAuthSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	token			: 	String,
	createdAt		: 	Date
});

module.exports = mongoose.model('SessionAuth', sessionAuthSchema);
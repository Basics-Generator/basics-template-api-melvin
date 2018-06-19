var mongoose = require('mongoose');

var sessionChangePasswordSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	token			: 	String,
	createdAt		: 	Date
});

module.exports = mongoose.model('SessionChangePassword', sessionChangePasswordSchema);
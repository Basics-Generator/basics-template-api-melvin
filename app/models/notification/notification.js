var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	title			: 	String,
	message			: 	String,
	createdAt		: 	String
});

module.exports = mongoose.model('notification', notificationSchema);
const mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	title					: 	String,
	description				: 	String,
	startDate				: 	Date,
	endDate					: 	Date,
});

module.exports = mongoose.model('Event', eventSchema);
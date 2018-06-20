var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	title					: 	String,
	description				: 	String,
	startDate				: 	Date,
	endDate					: 	Date,
});

module.exports = mongoose.model('Event', eventSchema);
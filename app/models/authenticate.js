var mongoose = require('mongoose');

var authenticateSchema = mongoose.Schema({
	email		 	: 	String,
	password	 	: 	String,
	token 			:   String
});

module.exports = mongoose.model('authenticate', authenticateSchema);
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username		: 	String,
	password		: 	String,
	lastname	 	: 	String,
	firstname	 	: 	String,
	email		 	: 	String,
	phone 			:	String,
	country 		: 	String,
	city 			:	String,
	postalCode		: 	String,
	adress			: 	String,
	birthday		: 	Date,
	description		: 	String,
	refreshToken	: 	String,
	createdAt		: 	Date,
	updateAt		: 	Date,

	photo		 	: 	String,
	photoThumb		: 	String,

	enable			: 	Boolean,
});

module.exports = mongoose.model('User', userSchema);
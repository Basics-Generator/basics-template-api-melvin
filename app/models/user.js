var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	email		 	: 	String,
	name	 		: 	String,
	username		: 	String,
	role 			: 	String,
	desc 			:	String,
	experiencedesc	: 	String,
	phone 			:	String,
	created			: 	Date,
	active			: 	Boolean,

	cv 				:	String,
	avatar		 	: 	String,

	linkedin 		:	String,
	fb 				:	String,
	twitter 		:	String,
	gmail 			:	String,
	experiences 	: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
	projects 		: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
	services 		: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]

});

module.exports = mongoose.model('User', userSchema);
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	user		 	: 	{
		type: mongoose.Schema.Types.ObjectId,
		ref : "Comment"
	},
	object			: 	String,
	message			: 	String,
	createdAt		: 	String
});

module.exports = mongoose.model('Comment', commentSchema);
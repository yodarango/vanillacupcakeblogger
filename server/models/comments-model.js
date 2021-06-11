const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	avatar: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		maxLength: 20,
	},
	comment: {
		type: String,
		maxLength: 200,
	},
	createdAt: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

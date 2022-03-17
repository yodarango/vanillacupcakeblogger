const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		uppercase: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: false,
	},
	postContent: String,
	category: [String],
	created: String,
	postImage: String,
	date: Date,
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

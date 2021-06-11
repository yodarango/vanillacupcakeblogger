const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	secondName: {
		type: String,
	},
	logo: {
		type: String,
	},
	background: {
		type: String,
	},
	featuredTitle: {
		type: String,
		trim: true,
		uppercase: true,
	},
	featuredContent: {
		type: String,
		trim: true,
	},
	featuredImage: {
		type: String,
	},
	profileImage: {
		type: String,
	},
	aboutMyself: String,
	contactInfo: String,
	categories: {
		type: [String],
		trim: true,
	},
	latestYoutubeVideoShow: String,
	youtubeShow: String,
	youtubeUrl: String,
	instagramShow: String,
	instagramUrl: String,
	facebookShow: String,
	facebookUrl: String,
	twitterShow: String,
	twitterUrl: String,
	pinterestShow: String,
	pinterestUrl: String,
	mediaFeedTitle: {
		type: String,
		trim: true,
		uppercase: true,
	},
	mediaFeedEmbed: {
		type: String,
		trim: true,
	},
	paypalButton: String,
	paypalButtonComment: String,
	password: String,
	email: String,
	paypalButtonTitle: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

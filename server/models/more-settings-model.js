const mongoose = require('mongoose');

const moreSettingsSchema = new mongoose.Schema({
	show_last_posts: {
		type: String,
		required: false,
	},
	last_posts_to_show: {
		type: [String],
		required: false,
	},
});

const moreSettingsModel = mongoose.model('MoreSettings', moreSettingsSchema);

module.exports = moreSettingsModel;

const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
		maxLength: 20,
	},
	email: {
		type: String,
		require: true,
		trim: true,
		maxLength: 50,
	},
	subscribedOn: String,
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;

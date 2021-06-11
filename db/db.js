const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_DB, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});
		console.log(`Successfully connected to ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

dbConnection();

module.exports = dbConnection;

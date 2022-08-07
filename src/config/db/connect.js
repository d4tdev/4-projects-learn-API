import mongoose from 'mongoose';
require('dotenv').config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
		});
		console.log('Connected to MongoDB');
	} catch (e) {
		console.log(e);
	}
};

export default { connect };

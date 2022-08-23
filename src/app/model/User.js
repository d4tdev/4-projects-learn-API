import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'product name must be provided'],
		minLength: 3,
		maxLength: 255,
	},
	email: {
		type: String,
		required: [true, 'product email must be provided'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'product email must be provided',
		],
		unique: true,
		minLength: 3,
		maxLength: 255,
	},
	password: {
		type: String,
		required: [true, 'product password must be provided'],
		minLength: 6,
	},
});

// pre middleware function for password authentication
UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	// instead of calling next() manually, can use return promise
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model('User', UserSchema);

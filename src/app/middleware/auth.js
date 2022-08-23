import User from '../model/User';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../../config/errors';
require('dotenv').config();

const authenticationMiddleware = async (req, res, next) => {
	//check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Please provide valid token');
	}
	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// attach the user to the job routes
		const user = await User.findById(payload.userId).select('-password').exec();
		// console.log(user)
		req.user = user;

		// req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (e) {
		throw new UnauthenticatedError('Invalid token');
	}
};

export default authenticationMiddleware;

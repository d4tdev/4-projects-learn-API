import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../../config/errors';

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('Please provide valid token');
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded;
		req.user = { id, username };
		next();
	} catch (e) {
		throw new UnauthenticatedError('Invalid token');
	}
};

export default authenticationMiddleware;

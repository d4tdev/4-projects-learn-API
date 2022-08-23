import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import User from '../model/User';
import { BadRequestError, UnauthenticatedError } from '../../config/errors';

class AuthController {
	register = async (req, res, next) => {
		try {
			const { name, email, password } = req.body;
			/**

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const tempUser = {name, email, password:hashedPassword};

		Phần này được xử lý từ trong model bằng middleware
		 */

			if (!name || !email || !password) {
				throw new BadRequestError(
					'Please provide name, email and password'
				);
			}

			const user = await User.create({ ...req.body });
			// createJWT is created in model folder
			const token = user.createJWT();

			res.status(StatusCodes.CREATED).json({
				user: { name: user.name },
				token,
			});
		} catch (e) {
			next(e);
		}
	};

	login = async (req, res, next) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				throw new BadRequestError('Please provide email and password');
			}
			const user = await User.findOne({ email });
			if (!user) {
				throw new UnauthenticatedError('Invalid Credentials');
			}
			const isPasswordCorrect = await user.comparePassword(password);
			if (!isPasswordCorrect) {
				throw new UnauthenticatedError('Invalid Credentials');
			}
			//compare password
			const token = user.createJWT();
			res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
		} catch (e) {
			next(e);
		}
	};
}

module.exports = new AuthController();

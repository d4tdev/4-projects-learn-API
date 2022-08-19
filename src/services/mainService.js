import { BadRequest } from '../config/errors/customError';
import jwt from 'jsonwebtoken';

const login = data => {
	return new Promise((resolve, reject) => {
		try {
			const { username, password } = data;
			if (!username || !password) {
				reject(new BadRequest('Please provide email and password'));
			}
			// just for demo, normally provided by database
			const id = new Date().getDate();
			//
			// try to keep payload small, better experience for user
			// just for demo, in production use long, complex and unguessable string value
			const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			});
			resolve({ token: token });
		} catch (e) {
			reject(e);
		}
	});
};

let dashboard = req => {
	return new Promise((resolve, reject) => {
		try {


		} catch (e) {
			reject(e);
		}
	});
};

export default { login, dashboard };

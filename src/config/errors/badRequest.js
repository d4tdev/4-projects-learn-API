import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customError';

class BadRequestError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = BadRequestError;

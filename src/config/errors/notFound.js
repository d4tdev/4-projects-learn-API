import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customError';

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

module.exports = NotFoundError;

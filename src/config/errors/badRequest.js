import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customError';

class BadRequest extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = BadRequest;

// import { CustomAPIError } from '../../config/errors';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};
	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ msg: err.message });
	// }

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors).map(item => item.message).join(', ');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		customError.statusCode = 400;
	}

	if (err.name === 'CastError') {
		customError.msg = `No item found with id: ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	// return res
	// 	.status(StatusCodes.INTERNAL_SERVER_ERROR)
	// 	.json({ msg: 'Something went wrong!!! please try again' });
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;

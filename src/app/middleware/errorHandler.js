import { CustomAPIError } from '../../config/errors';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		console.log(err);
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ msg: 'Something went wrong!!! please try again' });
};

export default errorHandler;

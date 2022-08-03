import { CustomAPIError } from '../../config/errors/customError';

const errorHandler = (err, req, res, next) => {
   if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({msg: err.message});
   }
   return res.status(500).json({msg: 'Something went wrong!!! please try again'});
};

export default errorHandler;
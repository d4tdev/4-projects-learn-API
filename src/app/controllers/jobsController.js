import Job from '../model/Job';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../../config/errors';

class JobsController {
	getAllJobs = async (req, res, next) => {
		const jobs = await Job.find({ createdBy: req.user._id }).sort(
			'createdAt'
		);
		res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
	};

	getJob = async (req, res, next) => {
		const {
			user: { _id },
			params: { id: jobId },
		} = req;

		const job = await Job.findOne({ _id: jobId, createdBy: _id }).populate(
			'createdBy'
		);
		if (!job) {
			throw new NotFoundError(`No job with id ${jobId}`);
		}
		return res.status(StatusCodes.OK).json({ job });
	};

	createJob = async (req, res, next) => {
		req.body.createdBy = req.user._id;
		const job = await Job.create(req.body);
		res.status(StatusCodes.CREATED).json({ job });
	};

	updateJob = async (req, res, next) => {
		const {
			user: { _id },
			body: { company, position },
			params: { id: jobId },
		} = req;

		if (company === '' || position === '') {
			throw new BadRequestError(
				'Company or Position fields cannot be empty!!!'
			);
		}
		const job = await Job.findByIdAndUpdate(
			{ _id: jobId, createdBy: _id },
			req.body,
			{ new: true, runValidators: true }
		);
		if (!job) {
			throw new NotFoundError(`No job with id ${jobId}`);
		}
		return res.status(StatusCodes.OK).json({ job });
	};

	deleteJob = async (req, res, next) => {
		const {
			user: { _id },
			params: { id: jobId },
		} = req;

		const job = await Job.findByIdAndRemove({
			_id: jobId,
			createdBy: _id,
		});
		if (!job) {
			throw new NotFoundError(`No job with id ${jobId}`);
		}
		return res.status(StatusCodes.OK).json({ job });
	};
}

export default new JobsController();

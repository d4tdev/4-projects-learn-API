import express from 'express';
const router = express.Router();

import jobsController from '../../app/controllers/jobsController';


router.route('/').post(jobsController.createJob).get(jobsController.getAllJobs);
router.route('/:id').get(jobsController.getJob).patch(jobsController.updateJob).delete(jobsController.deleteJob);

export default router;

import authRouter from './v1/auth';
import jobsRouter from './v1/jobs';
import homeRouter from './v1/home';

import authMiddleware from '../app/middleware/auth';



const routes = app => {
	app.use('/api/v1/auth', authRouter);
	app.use('/api/v1/jobs', authMiddleware, jobsRouter);
	app.use('/', homeRouter);
};

export default routes;

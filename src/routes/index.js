import authRouter from './v1/auth';
import jobsRouter from './v1/jobs';

import authMiddleware from '../app/middleware/auth'

const routes = (app) => {
   app.get('/', (res, req) => {
      res.send('Welcome to the jobs api');
   })
   app.use('/api/v1/auth', authRouter);
   app.use('/api/v1/jobs', authMiddleware, jobsRouter);
};

export default routes;

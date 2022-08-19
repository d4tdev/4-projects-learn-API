import apiV1Router from './v1/index';

const routes = (app) => {
   app.use('/api/v1', apiV1Router);
};

export default routes;
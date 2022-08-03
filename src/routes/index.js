import apiV1Router from './v1/apiV1';

let route = app => {
	app.use('/api/v1', apiV1Router);
};

export default route;

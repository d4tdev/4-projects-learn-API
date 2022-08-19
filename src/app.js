import express from 'express';
require('dotenv').config();
require('express-async-errors');
const app = express();

import routes from './routes/index'
import notFound from './app/middleware/notFound';
import errorHandler from './app/middleware/errorHandler';
import db from './config/db/connect';

db.connect();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

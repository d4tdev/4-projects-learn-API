import express from 'express';
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

import notFound from './app/middleware/notFound';
import errorHandler from './app/middleware/errorHandler';
import routes from './routes/index';
import db from './config/db/connect'

db.connect();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


routes(app);
app.use(notFound);
// app.use(errorHandler);


app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});

import express from 'express';
import route from './routes/index';
import db from './config/db/connect'
import notFound from "./app/middleware/notFound";
import errorHandler from './app/middleware/errorHandler'
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});

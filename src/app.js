import express from 'express';
require('dotenv').config();
require('express-async-errors');
const app = express();

// extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

// swagger
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

import routes from './routes/index'
import notFound from './app/middleware/notFound';
import errorHandler from './app/middleware/errorHandler';
import db from './config/db/connect';

db.connect();

app.set('trust proxy', 1);
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 150 // limit each IP to 100 requests per windowMs
}));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

routes(app);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

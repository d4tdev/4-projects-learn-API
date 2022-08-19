import express from 'express';
const router = express.Router();

import mainRouter from '../../app/controllers/mainController';
import authMiddleware from '../../app/middleware/auth';

router.route('/dashboard').get(authMiddleware, mainRouter.dashboard);
router.route('/login').post(mainRouter.login);

export default router;

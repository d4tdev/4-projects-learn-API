import express from 'express';
const router = express.Router();

import authController from '../../app/controllers/authController';

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;

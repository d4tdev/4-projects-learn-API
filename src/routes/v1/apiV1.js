import express from 'express';
const router = express.Router();

import productsRouter from './products'

router.use('/products',productsRouter);

export default router;
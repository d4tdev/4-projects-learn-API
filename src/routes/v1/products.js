import express from 'express';
const router = express.Router();

import productsController from '../../app/controllers/productsController'

router.route('/').get(productsController.handleGetAllProducts);
router.route('/static').get(productsController.handleGetAllProductsStatic);

export default router;
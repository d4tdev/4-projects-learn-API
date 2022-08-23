import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

export default router;

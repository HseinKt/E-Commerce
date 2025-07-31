const { Router } = require('express');
const { createProduct } = require('../controllers/product.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = Router();

router.post('/products', createProduct);

module.exports = router;
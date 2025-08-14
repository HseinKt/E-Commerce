const { Router } = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');
const upload = require('../config/upload.config');

const router = Router();

router.get('/products', authMiddleware, getAllProducts);
router.get('/products/:id', authMiddleware, getProductById);
router.post('/products', authMiddleware, adminMiddleware, upload.single('image'), createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
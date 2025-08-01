const { Router } = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = Router();

router.get('/category', authMiddleware, getAllCategories);
router.get('/category/:id', authMiddleware, getCategoryById);
router.post('/category', authMiddleware, adminMiddleware, createCategory);
router.put('/category/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/category/:id', authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
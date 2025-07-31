const { Router } = require('express');
const { createCategory } = require('../controllers/category.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = Router();

router.post('/category', createCategory);

module.exports = router;
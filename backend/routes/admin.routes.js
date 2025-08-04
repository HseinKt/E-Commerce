const { Router } = require('express');
const { getStats } = require('../controllers/admin.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = Router();

router.get('/stats', authMiddleware, adminMiddleware, getStats);

module.exports = router;


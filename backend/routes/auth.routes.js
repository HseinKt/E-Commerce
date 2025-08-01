const { Router } = require('express');
const { register, login, getCurrentUser } = require('../controllers/auth.controllers');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;

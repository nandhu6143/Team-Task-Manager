const express = require('express');
const { register, login, getMe, getUsers } = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getMe);
router.get('/users', protect, getUsers);

module.exports = router;

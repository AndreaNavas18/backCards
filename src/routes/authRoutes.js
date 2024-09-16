const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');

// Rutas de loggeo
router.post('/registro', authController.register);
router.post('/login', authController.login);

module.exports = router;

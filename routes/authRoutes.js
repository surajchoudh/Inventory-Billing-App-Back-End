// routes/authRoutes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.post('/register', authController.registerUser);

// Add other routes and controllers for login, logout, etc.

module.exports = router;

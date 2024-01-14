const express = require('express');
const router = express.Router();

const inventoryRoutes = require('./inventoryRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const authRoutes = require('./authRoutes');

// Mounting the different route handlers
router.use('/inventory', inventoryRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/auth', authRoutes);

module.exports = router;

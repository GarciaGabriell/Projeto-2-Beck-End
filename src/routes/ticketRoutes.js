// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/vendas', ticketController.showSalesPage);

router.post('/vendas', ticketController.showPurchaseConfirmation);

module.exports = router;

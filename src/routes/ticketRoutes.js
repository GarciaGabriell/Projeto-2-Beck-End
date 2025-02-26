// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { isAdmin} = require('../middlewares/isAdmin');
const {authenticate} = require('../middlewares/authenticate')

router.post('/vendas', ticketController.showPurchaseConfirmation);

router.post('/register', authenticate, isAdmin, async (req, res) => {
    return ticketController.createTicket(req, res);
});

router.put('/update/:id', authenticate, isAdmin, async (req, res) => {
    return ticketController.updateTicket(req, res);
});

router.delete('/delete/:id', authenticate, isAdmin, async (req, res) => {
    return ticketController.deleteTicket(req, res);
});

router.get('/', authenticate, isAdmin, async (req, res) => {
    return ticketController.getTicket(req, res);
});


module.exports = router;

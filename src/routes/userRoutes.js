const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ticketController = require('../controllers/ticketController');

// Rota POST para registrar o novo usuário
router.post('/register', async (req, res) => {
    return authController.register(req, res);
});

router.post('/login', async (req, res) => {
    return authController.loginApi(req, res);
})

module.exports = router;

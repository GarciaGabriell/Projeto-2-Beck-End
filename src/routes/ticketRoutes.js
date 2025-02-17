// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController'); // Importa o controlador de tickets

// Rota GET para exibir a página de vendas com os ingressos disponíveis
router.get('/vendas', ticketController.showSalesPage);  // Exibe a página de vendas, mostrando os ingressos e preços

// Rota POST para processar a compra de ingressos
router.post('/vendas', ticketController.showPurchaseConfirmation); // Processa a compra, mostrando a confirmação da compra com os detalhes

// Rota POST para confirmar a compra de ingressos
router.post('/vendas/confirmar', ticketController.confirmPurchase); // Confirma a compra após a revisão dos detalhes

// Rota GET para cancelar a compra de ingressos
router.get('/vendas/cancelar', ticketController.cancelPurchase); // Cancela a compra de ingressos, retornando ao estado anterior

// Exporta as rotas para que possam ser usadas em outras partes da aplicação
module.exports = router;

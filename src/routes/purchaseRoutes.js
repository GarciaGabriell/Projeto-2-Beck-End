const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { authenticate } = require('../middlewares/authenticate');

// Rota GET para exibir a página de vendas com os ingressos e preços
router.get('/vendas', authenticate, purchaseController.showSalesPage);  // Exibe a página de vendas (necessita de autenticação)

// Rota POST para criar uma nova compra
router.post('/vendas', authenticate, purchaseController.createPurchase);  // Criação de uma compra, com autenticação necessária

// Rota GET para exibir o histórico de compras do usuário
router.get('/historico', authenticate, purchaseController.getPurchaseHistory);  // Exibe o histórico de compras do usuário (necessita de autenticação)

// Rota POST para cancelar uma compra existente, identificada pelo ID
router.post('/cancelar/:purchaseId', authenticate, purchaseController.cancelPurchase);  // Cancela uma compra específica (necessita de autenticação)

// Rota GET para exibir a página de confirmação de compra com os detalhes da compra
router.get('/confirmacaoCompra/:purchaseId', authenticate, purchaseController.showConfirmPurchase);  // Exibe os detalhes de confirmação da compra

// Rota POST para confirmar uma compra específica, identificada pelo ID
router.post('/confirmar/:purchaseId', authenticate, purchaseController.confirmPurchase);  // Confirma a compra (necessita de autenticação)

module.exports = router;  // Exporta as rotas para serem usadas em outras partes da aplicação

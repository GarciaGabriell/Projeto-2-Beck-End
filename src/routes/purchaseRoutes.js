const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { authenticate } = require('../middlewares/authenticate');

router.get('/vendas', authenticate, purchaseController.showSalesPage); 

router.post('/vendas', authenticate, purchaseController.createPurchase);  

router.get('/historico', authenticate, purchaseController.getPurchaseHistory);

router.post('/cancelar/:purchaseId', authenticate, purchaseController.cancelPurchase); 

router.get('/confirmacaoCompra/:purchaseId', authenticate, purchaseController.showConfirmPurchase); 

router.post('/confirmar/:purchaseId', authenticate, purchaseController.confirmPurchase);  

module.exports = router; 

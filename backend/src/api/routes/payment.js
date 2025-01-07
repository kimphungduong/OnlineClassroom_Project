const express = require ('express');
const router =express.Router();

const paymentController= require('../controllers/PaymentController');

router.post('/create',paymentController.createPayment);
router.get('/process/:paymentId',paymentController.processPayment);
router.post('/cancel',paymentController.cancelPayment);
router.get('/:paymentId',paymentController.getPayment);


module.exports = router;
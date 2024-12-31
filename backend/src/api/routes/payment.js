const express = require ('express');
const router =express.Router();

const paymentController= require('../controllers/PaymentController');

router.post('/creat',paymentController.createPayment);
router.get('/process',paymentController.processPayment);


module.exports = router;
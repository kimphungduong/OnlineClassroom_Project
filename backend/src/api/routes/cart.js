const express = require ('express');
const router =express.Router();

const cartController= require('../controllers/CartController');

router.post('/add',cartController.addToCart);
router.delete('/remove/:courseId', cartController.removeFromCart);
router.get('/view',cartController.getCart);




module.exports = router;
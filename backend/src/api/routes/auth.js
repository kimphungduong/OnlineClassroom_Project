const express = require ('express');
const router =express.Router();

const authController= require('../controllers/AuthController');

// router.post('/auth/google',authController.google);
router.post('/login',authController.login);
router.post('/refresh-token',authController.requestRefreshToken);
router.post('/logout',authController.logout);
router.post('/register',authController.register);


module.exports = router;
const express = require ('express');
const router =express.Router();

const authController= require('../controllers/AuthController');

router.post('/auth/google',authController.google);
router.post('/login',authController.login);
router.post('/refresh-token',authController.requestRefreshToken);
router.post('/logout',authController.logout);
router.post('/register',authController.register);
router.post('/send-verify-code',authController.sendVerifyCode);
router.post('/verify-code',authController.verifyCode);
router.post('/reset-password',authController.resetPassword);

module.exports = router;
const express = require ('express');
const router =express.Router();

const settingController= require('../controllers/SettingController');

router.get('/profile',settingController.editProfile);
router.post('/profile',settingController.updateInfo);
router.post('/password',settingController.updatePassword);


module.exports = router;
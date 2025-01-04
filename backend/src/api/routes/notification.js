const express = require ('express');
const router =express.Router();

const { getAllNotification, setRead } = require('../controllers/NotificationController');

router.get('/getAllNotification', getAllNotification);
router.post('/setRead/:notificationId', setRead)

module.exports = router;
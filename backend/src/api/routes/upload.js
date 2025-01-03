const express = require('express');
const router = express.Router();
const { videoUpload, documentUpload } = require('../../configs/multerConfig');
const UploadController = require('../controllers/UploadController');

router.post('/video', videoUpload, UploadController.uploadVideo);
router.post('/document', documentUpload, UploadController.uploadDocument);
router.delete('/delete-file', UploadController.deleteFile);
module.exports = router;

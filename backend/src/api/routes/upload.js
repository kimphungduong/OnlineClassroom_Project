const express = require('express');
const router = express.Router();
const {imageUpload, videoUpload, documentUpload } = require('../../configs/multerConfig');
const UploadController = require('../controllers/UploadController');

router.post('/video', videoUpload, UploadController.uploadVideo);
router.post('/document', documentUpload, UploadController.uploadDocument);
router.post('/image', imageUpload, UploadController.uploadImage);
router.delete('/delete-file', UploadController.deleteFile);
module.exports = router;

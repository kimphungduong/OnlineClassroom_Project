const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course_videos',
    resource_type: 'video',
  },
});

const documentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course_documents',
    resource_type: 'raw',
  },
});

const videoUpload = multer({ storage: videoStorage });
const documentUpload = multer({ storage: documentStorage });

module.exports = { videoUpload, documentUpload };

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

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

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course_images',
    resource_type: 'image',
  },
});

const videoUpload = multer({
  storage: videoStorage
}).single('video');

const documentUpload = multer({
  storage: documentStorage
}).single('document');

const imageUpload = multer({
  storage: imageStorage
}).single('image');

module.exports = {imageUpload, videoUpload, documentUpload };

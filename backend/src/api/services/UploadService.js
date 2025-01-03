const cloudinary = require('../../configs/cloudinary');

function extractPublicIdFromUrl(url) {
  try {
    const uploadSegment = '/upload/';
    const uploadIndex = url.indexOf(uploadSegment);
    if (uploadIndex === -1) {
      throw new Error('Invalid Cloudinary URL');
    }

    const afterUpload = url.slice(uploadIndex + uploadSegment.length);
    const publicId = afterUpload.split('/').slice(-2).join('/').split('.')[0];

    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error.message);
    return null;
  }
}

class UploadService {
  async uploadVideo(file) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'course_videos',
        resource_type: 'video',
      });
      return {
        link: result.secure_url,
        duration: result.duration, // Duration in seconds
        public_id: result.public_id, // Public ID for future reference
      };
    } catch (error) {
      throw new Error('Lỗi khi upload video');
    }
  }

  async uploadDocument(file) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'course_documents',
        resource_type: 'raw',
      });
      return {
        link: result.secure_url,
        public_id: result.public_id, // Public ID for future reference
      };
    } catch (error) {
      throw new Error('Lỗi khi upload tài liệu');
    }
  }

  async deleteFile(url, resource_type) {
    try {
      const publicId = extractPublicIdFromUrl(url);
      await cloudinary.uploader.destroy(publicId, {
        resource_type: resource_type,
      });
      return publicId;
    } catch (error) {
      throw new Error('Lỗi khi xóa file');
    }
  }
}

module.exports = new UploadService();

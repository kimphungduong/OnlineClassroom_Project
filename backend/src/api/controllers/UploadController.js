const UploadService = require('../services/UploadService');


  
class UploadController {
  async uploadVideo(req, res) {
    try {
      const videoDetails = await UploadService.uploadVideo(req.file); // Pass req.file
      res.status(200).json(videoDetails); // Includes URL, duration, and public_id
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Lỗi khi upload video' });
    }
  }

  async uploadDocument(req, res) {
    try {
      const documentDetails = await UploadService.uploadDocument(req.file);
      res.status(200).json(documentDetails); // Includes URL and public_id for each file
    } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ message: 'Lỗi khi upload tài liệu' });
    }
  }

  async deleteFile(req, res) {
    try {
      const {url , resource_type} = req.body; 
      const response = await UploadService.deleteFile(url, resource_type);
      res.status(200).json({ message: "Xóa file thành công" });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ message: 'Lỗi khi xóa file' });
    }
  }
}

module.exports = new UploadController();
    
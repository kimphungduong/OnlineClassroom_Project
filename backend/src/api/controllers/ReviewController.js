const Review = require('../models/Review');
const Student = require('../models/Student'); // Đảm bảo import đúng model

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('student', 'name'); // Populate student và chọn trường name
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá', error: error.message });
  }
};

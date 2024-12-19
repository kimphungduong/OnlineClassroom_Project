const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');

// Lấy tất cả đánh giá
router.get('/', reviewController.getAllReviews);

module.exports = router;

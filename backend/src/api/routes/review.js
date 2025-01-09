const express = require('express');
const ReviewController = require('../controllers/ReviewController');

const router = express.Router();


// Get all reviews
router.get('/', ReviewController.getReviews);

// Get a review by ID
router.get('/:id', ReviewController.getReviewById);


// Get course stats by slug
router.get('/:slug/stat', ReviewController.getCourseStats);

router.post('/', ReviewController.addReview)

module.exports = router;

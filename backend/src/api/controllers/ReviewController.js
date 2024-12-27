const ReviewService = require('../services/ReviewService');

class ReviewController {
  async createReview(req, res) {
    try {
      const review = await ReviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReviews(req, res) {
    try {
      const filters = req.query;
      const reviews = await ReviewService.getReviews(filters);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async getCourseStats(req, res) {
    try {
      const stats = await ReviewService.getCourseStatsBySlug(req.params.slug);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReviewController();

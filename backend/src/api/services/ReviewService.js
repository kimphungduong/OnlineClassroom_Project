// review.service.js
const Review = require('../models/Review');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

class ReviewService {
  async getReviews(filters) {
    return await Review.find(filters).populate('course teacher student');
  }

  async getCourseStatsBySlug(slug) {
    const course = await Course.findOne({ slug });
    if (!course) {
      throw new Error('Course not found');
    }
  
    // Truy vấn reviews dựa trên course._id
    const reviews = await Review.find({ course: course._id }).populate('student', 'name');;
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;
  
    return {
      course: course.name,
      totalReviews,
      averageRating,
      reviews,
    };
  }

  async getReviewById(id) {
    const review = await Review.findById(id).populate('course teacher student');
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  }

}

module.exports = new ReviewService();

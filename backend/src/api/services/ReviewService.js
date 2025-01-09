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
  async addReview(courseId, userId, rating, comment) {
    try {
      // Create a new review
      const review = new Review({
        course: courseId,
        student: userId,
        rating,
        comment,
      });
      //Nếu học viên đã review rồi thì không cho review nữa
      const student = await Student.findById(userId);
      if (!student) {
        throw new Error('Student not found');
      }
      const reviewedCourses = await Review.find({ student: userId, course: courseId });
      if (reviewedCourses.length > 0) {
        throw new Error('You have already reviewed this course');
      }

      // Save the review to the database
      await review.save();

      // Fetch all reviews for the course to update the average rating
      const reviews = await Review.find({ course: courseId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = (totalRating / reviews.length).toFixed(1);


      // Update the course's average rating
      await Course.findByIdAndUpdate(courseId, { rating: averageRating });

      return review;
    } catch (error) {
      throw new Error('Error adding review: ' + error.message);
    }
  }
}

module.exports = new ReviewService();

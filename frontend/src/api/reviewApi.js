import axiosInstance from './axiosInstance';

const reviewApi = {
  // Get all reviews
  getAllReviews: () => {
    return axiosInstance.get('/reviews');
  },

  // Get a review by ID
  getReviewById: (id) => {
    return axiosInstance.get(`/reviews/${id}`);
  },

  // Get course stats by course slug
  getCourseStats: (slug, page = 1, limit = 5) => {
    return axiosInstance.get(`/review/${slug}/stat`, {
      params: {
        page,
        limit,
      },
    });
  },
  addReview: (review) =>{
    return axiosInstance.post('/review', review);
  }

};

export default reviewApi;

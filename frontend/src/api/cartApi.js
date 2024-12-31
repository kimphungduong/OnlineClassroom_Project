import axiosInstance from './axiosInstance';

const cartApi = {
  // Lấy dữ liệu giỏ hàng
  getCart: () => {
    return axiosInstance.get('/cart/view'); // Thay đổi thành đúng endpoint
  },
  // Thêm một khóa học vào giỏ hàng
  addToCart: (courseId) => {
    return axiosInstance.post('/cart/add', { courseId });
  },
  // Xóa một khóa học khỏi giỏ hàng
  removeFromCart: (courseId) => {
    return axiosInstance.delete(`/cart/remove/${courseId}`);
  },  
  // Xóa toàn bộ giỏ hàng
  clearCart: () => {
    return axiosInstance.post('/cart/clear');
  },
};

export default cartApi;

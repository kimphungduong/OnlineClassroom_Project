import { get } from '~/utils/httpRequest';
import axiosInstance from './axiosInstance';

const paymentpaymentApi = {
  // Lấy dữ liệu giỏ hàng
  create: (ItemsIds) => {
    return axiosInstance.post('/payment/create', {ItemsIds}); // Thay đổi thành đúng endpoint
  },
  getPayment: (paymentId) => {
    return axiosInstance.get('/payment/' + paymentId); // Thay đổi thành đúng endpoint
  },
  // Thêm một khóa học vào giỏ hàng
  process: (paymentId) => {
    return axiosInstance.get('/payment/process/' + paymentId); // Thay đổi thành đúng endpoint
  },
  // Hủy thanh toán
  cancel: (paymentId) => {
    return axiosInstance.post('/payment/cancel', { paymentId });
  }
};

export default paymentpaymentApi;

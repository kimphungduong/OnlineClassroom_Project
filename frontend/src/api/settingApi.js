import ChangePassword from '~/layouts/components/ChangePassword';
import axiosInstance from './axiosInstance';

const settingApi = {
  getProfile: (courseSlug, lessonId) => {
    return axiosInstance.get(`/setting/profile`);
  },
  updateProfile: ( profile) => {
    return axiosInstance.post(`/setting/profile`, { ...profile });
  },
  changePassword: ( currentPassword, newPassword, repeatNewPassword) => {
    return axiosInstance.post(`/setting/password`, { currentPassword, newPassword, repeatNewPassword });
  },
};

export default settingApi;
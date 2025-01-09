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
  updateAvatar: async (formData) => {
    try {
        const response = await axiosInstance.post('setting/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Lỗi khi tải lên avatar: ' + error.message);
    }
  }
};

export default settingApi;
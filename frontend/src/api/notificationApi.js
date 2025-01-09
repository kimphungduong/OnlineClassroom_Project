import axiosInstance from './axiosInstance';

const notificationApi = {
    getAllNotification: () => axiosInstance.get(`/notification/getAllNotification`),
    setRead: (notificationId) => axiosInstance.post(`/notification/setRead/${notificationId}`),
};



export default notificationApi;
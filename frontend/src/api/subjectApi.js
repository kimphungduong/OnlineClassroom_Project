import axiosInstance from './axiosInstance';

const subjectApi = {
  getAllSubject: () => {
    return axiosInstance.get('/subject');
  },

};

export default subjectApi;

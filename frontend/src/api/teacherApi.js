import axiosInstance from './axiosInstance';

const teacherApi = {
  // Get teacher details
  getTeacher: () => {
    return axiosInstance.get(`/teacher`);
  },

  // Update a teacher's information
  updateCourseTeacher: (updatedTeacherData) => {
    return axiosInstance.put(`/teacher`, updatedTeacherData);
  },
};

export default teacherApi;

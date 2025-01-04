import axiosInstance from './axiosInstance';

const teacherApi = {
  // Get teacher details
  getTeacher: (teacherId) => {
    return axiosInstance.get(`/teacher/${teacherId}`);
  },

  // Update a teacher's information
  updateCourseTeacher: (teacherId, updatedTeacherData) => {
    return axiosInstance.put(`/teacher/${teacherId}`, updatedTeacherData);
  },
};

export default teacherApi;

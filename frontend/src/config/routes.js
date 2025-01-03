const routes = {
    home: '/',
    following: '/following',
    profile: '/@:nickname',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    login: '/login',
    dashboard: '/dashboard',
    course: '/course',
    detail: '/detail/:slug', // Tham số động cho chi tiết khóa học
    subject: '/subject/:subjectName', // Tham số động cho môn học
};

export default routes;

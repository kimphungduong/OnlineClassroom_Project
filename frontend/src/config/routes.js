import { logout } from "~/store/slices/authSlice";

const routes = {
    home: '/',
    following: '/following',
    logout: '/logout',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    dashboard: '/dashboard',
    course: '/course',
    detail: '/detail/:slug', // Tham số động cho chi tiết khóa học
    subject: '/subject/:subjectName', // Tham số động cho môn học
    course: '/course/:slugCourse/:slugLesson',
    cart: '/cart',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
    payment: '/payment/:paymentId',
};

export default routes;
